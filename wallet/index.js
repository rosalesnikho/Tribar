const Transaction = require('./transaction');
const {STARTING_BALANCE } = require('../config');
const { eC, cryptoHash  } = require('../util/index');

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

	sign(data) {
		return this.keyPair.sign(cryptoHash(data));
	}

	createTransaction(recipient, amount) {
		if(amount > this.balance) {
			throw new Error('Amount exceeds the balance');
		}

		return new Transaction({ senderWallet: this, recipient, amount })
	}

}

module.exports = Wallet;