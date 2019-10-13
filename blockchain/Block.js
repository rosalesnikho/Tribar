const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('../config');
const { cryptoHash } = require('../util/');

/*
*
* Model for the Block class requiring minimum params for creating a block
*
*/
class Block {
	constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	/*
	*
	* Genesis data is the starting block
	*
	*/
	static genesis() {
		return new this(GENESIS_DATA);
	}


	/*
	*
	* Main method for block mining
	*
	*/
	static mineBlock({ lastBlock, data }) {
		const lastHash = lastBlock.hash;
		let hash, timestamp;
		let { difficulty } = lastBlock;
		let nonce = 0;

		/*
		*
		* Mined block difficulty settings and verifying that each block mined resolves
		* to the network difficulty levels.
		*
		*/
		do {
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
			hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
		} while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

		/*
		*
		* Returns mined blocks with data and correct time stamp
		*
		*/
		return new this({ timestamp, hash, lastHash, data, nonce, difficulty});
	};

	/*
	*
	* Difficulty for how hard a mine can be blocked based mine rate
	* The faster a block can be mined the difficulty is adjusted  on the next block
	* the slower a block can be mined, difficulty is adjusted again
	*
	*/
	static adjustDifficulty({ originalBlock, timestamp }) {
		const { difficulty } = originalBlock;

		// Set difficulty to always return 1
		if(difficulty < 1) return 1;

		// Set mined block difficulty to adjust based on MINE_RATE
		if ((timestamp - originalBlock.timestamp) > MINE_RATE ) return difficulty - 1;
		return difficulty + 1;
	}
}


module.exports = Block;