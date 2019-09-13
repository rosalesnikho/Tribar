// Requires
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

/*
* Model for the Block class requiring minimum params for creating a block
*/
class Block {
	constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	/*
	*
	*/
	static genesis() {
		return new this(GENESIS_DATA);
	}

	/*
	*
	*/
	static adjustDifficulty({ originalBlock, timestamp }) {
		const { difficulty } = originalBlock;

		// Set difficulty to always return 1
		if(difficulty < 1) return 1;

		// Set mined block difficulty to adjust based on MINE_RATE
		if (timestamp - originalBlock.timestamp > MINE_RATE ) return difficulty - 1;
		return difficulty + 1;
	}


	/*
	*
	*/
	static mineBlock({ lastBlock, data }) {
		let hash, timestamp;
		const lastHash = lastBlock.hash;
		let { difficulty } = lastBlock;
		let nonce = 0;

		/*
		* Mined block difficulty settings and verifying that each block mined resolves
		* to the network difficulty levels.
		*/
		do {
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp, });
			hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
		} while (hash.substr(0, difficulty) !== '0'.repeat(difficulty));

		/*
		* Returns mined blocks with data and correct time stamp
		*/
		return new this({ timestamp, hash, lastHash, data, nonce, difficulty});
	};
}


module.exports = Block;