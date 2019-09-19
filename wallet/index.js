const {STARTING_BALANCE } = require('../config');
const cryptoHash = require('../util/crypto-hash');
const { eC } = require('../util/index');

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
}

module.exports = Wallet;