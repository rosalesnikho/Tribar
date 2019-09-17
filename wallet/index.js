const {STARTING_BALANCE } = require('../config');
const { eC } = require('../util/index');


class  Wallet {
	constructor() {
		this.balance = STARTING_BALANCE;

		const keyPair = eC.genKeyPair();

		this.publicKey = keyPair.getPublic();
	}


}

module.exports = Wallet;