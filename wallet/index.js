const Transaction = require('./transaction');
const { STARTING_BALANCE } = require('../config');
const { eC, cryptoHash  } = require('../util');

/*
*
* Wallet has two key pairs, private and public
* both keys use elliptical curve cryptography for hashing
*
* */
class  Wallet {
	constructor() {
		this.balance = STARTING_BALANCE;
		this.keyPair = eC.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}

	// Sign block chain with Key Pair
	sign(data) {
		return this.keyPair.sign(cryptoHash(data));
	}

	// Creates a transaction between  users / wallets
	createTransaction({recipient, amount, chain}) {
		if (chain) {
			this.balance = Wallet.calculateBalance({
				chain,
				address: this.publicKey
			});
		}
		if(amount > this.balance) {
			throw new Error('Amount exceeds balance');
		}

		return new Transaction({ senderWallet: this, recipient, amount })
	}

	// Calculates total balance
	static calculateBalance({ chain, address }) {
		let hasConductedTransaction = false;
		let outputsTotal = 0;

		for (let i = chain.length-1; i > 0; i--) {
			const block = chain[i];

			for (let transaction of block.data) {
				if (transaction.input.address === address) {
					hasConductedTransaction = true;
				}

				const addressOutput = transaction.outputMap[address];

				if (addressOutput) {
					outputsTotal = outputsTotal + addressOutput;
				}
			}

			if (hasConductedTransaction) {
				break;
			}
		}

		return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;
	}
}

module.exports = Wallet;