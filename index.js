const bodyParses = require('body-parser');
const express = require ('express');
const request = require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');
const TransactionPool = require('./wallet/transaction-pool');
const Wallet = require('./wallet');

// Instantiate Express application & other classes
const app  = express();
const blockChain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubSub = new PubSub({blockChain});

const DEFAULT_PORT = 3000;
const ROOT_NOTE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(() => pubSub.broadcastChain(), 1000);

// Uses body parses to receive and send JSON
app.use(bodyParses.json());


// Get request to read block chain data
app.get('/api/blocks', (req, res ) => {
	res.json(blockChain.chain)
});


// Post Request to send new instances of a block
app.post('/api/mine', (req, res) => {
	 const {data} = req.body;
	 blockChain.addBlock({ data });

	 pubSub.broadcastChain();
	 // Once block chain is added redirects to /api/blocks end point
	 res.redirect('/api/blocks');
});

app.post('/api/transact', (req, res) => {
	const { amount, recipient } = req.body;
	let transaction;
	try {
		transaction = wallet.createTransaction({ recipient, amount });
	} catch (e) {
		return res.status(400).json({ type: 'e', message: e.message })
	}

	transactionPool.setTransaction(transaction);
	console.log('transactionPool', transactionPool);
	res.json({ type: 'success', transaction });
});

// Synchronizes block chain length across the network to all nodes
const syncChains = () => {
	request({ url: `${ROOT_NOTE_ADDRESS}/api/blocks`}, (error, response, body) => {
		if(!error && response.statusCode === 200) {
			const rootChain = JSON.parse(body);
			console.log(`replaced chain on sync: ${rootChain}`);
			blockChain.replaceChain(rootChain)
		}
	})
};


// Port Setup
let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true') {
	PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000 )
}



const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
	console.log('Listening at port: ' + PORT);
	syncChains();
});

