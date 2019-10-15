const bodyParses = require('body-parser');
const express = require ('express');
const request = require('request');
const path = require('path');
const cors = require('cors');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');
const TransactionPool = require('./wallet/transaction-pool');
const Wallet = require('./wallet');
const TransactionMiner = require('./app/transaction-miner');

// Instantiate Express application & other classes
const app  = express();
const blockChain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubSub = new PubSub({blockChain, transactionPool, wallet});
const transactionMiner = new TransactionMiner({ blockChain, transactionPool, wallet, pubSub });




const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(() => pubSub.broadcastChain(), 1000);


// Uses body parses to receive and send JSON
app.use(bodyParses.json());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cors());


// Get request to read block chain data
	app.get('/api/blocks', (req, res) => {
		res.json(blockChain.chain);
	});


// Post Request to send new instances of a block
	app.post('/api/mine', (req, res) => {
		const {data} = req.body;
		blockChain.addBlock({data});

		//Broadcast chain as soon as it's created
		pubSub.broadcastChain();

		// Once block chain is added redirects to /api/blocks end point
		res.redirect('/api/blocks');
	});


// Post request to create a new transaction between wallets
	app.post('/api/transact', (req, res) => {

		const {amount, recipient} = req.body;

		let transaction = transactionPool
			.existingTransaction({inputAddress: wallet.publicKey});

		try {
			if (transaction) {
				transaction.update({senderWallet: wallet, recipient, amount})
			} else {
				transaction = wallet.createTransaction({
					recipient,
					amount,
					chain: blockChain.chain
				});
			}
		} catch (e) {
			return res.status(400).json({type: 'e', message: e.message})
		}

		transactionPool.setTransaction(transaction);
		pubSub.broadcastTransaction(transaction);
		res.json({type: 'success', transaction});
	});

// Transaction Pool Map (T P M ) to retrieve all transactions
	app.get('/api/tpm', (req, res) => {
		res.json(transactionPool.transactionMap);
	});

// Retrieved mined transactions
	app.get('/api/mine-transactions', (req, res) => {
		transactionMiner.mineTransactions();
		res.redirect('/api/blocks');
	});

// Retrieve wallet information from each user
	app.get('/api/wallet-info', (req, res) => {
		const address = wallet.publicKey;
		res.json({
			address,
			balance: Wallet.calculateBalance({
				chain: blockChain.chain,
				address: wallet.publicKey
			})
		})
	});


// Serves up Client resources for React
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Synchronizes block chain length across the network to all nodes
	const syncWithRootState = () => {
		request({url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const rootChain = JSON.parse(body);
				console.log('replaced root chain on sync: ', rootChain);
				blockChain.replaceChain(rootChain)
			}
		});

		request({url: `${ROOT_NODE_ADDRESS}/api/tpm`}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const rootTransactionPoolMap = JSON.parse(body);
				console.log('replace transaction pool map on sync with', rootTransactionPoolMap);
				transactionPool.setMap(rootTransactionPoolMap);
			}
		});
	};

//	Data Seeder
	const walletFoo = new Wallet();
	const walletBar = new Wallet();

	const generateWalletTransaction = ({ wallet, recipient, amount }) => {
		const transaction = wallet.createTransaction({
			recipient, amount, chain: blockChain.chain
		});

		transactionPool.setTransaction(transaction);
	};

	const walletAction = () => generateWalletTransaction({
		wallet, recipient: walletFoo.publicKey, amount: 5
	});

	const walletFooAction = () => generateWalletTransaction({
		wallet: walletFoo, recipient: walletBar.publicKey, amount: 10
	});

	const walletBarAction = () => generateWalletTransaction({
		wallet: walletBar, recipient: wallet.publicKey, amount: 15
	});

	for (let i = 0; i < 10; i++) {
		if (i % 3 === 0) {
			walletAction();
			walletFooAction();
		} else if (i % 3 === 1) {
			walletAction();
			walletBarAction();
		} else {
			walletFooAction();
			walletBarAction();
		}

		transactionMiner.mineTransactions();
	}


	// Port Setup
	let PEER_PORT;
	if (process.env.GENERATE_PEER_PORT === 'true') {
		PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
	}

	const PORT = PEER_PORT || DEFAULT_PORT;
	app.listen(PORT, () => {
		console.log('Listening at port: ' + PORT);
		syncWithRootState();
	});

