
/*
*
*
*/
const Block  = require('./Block');
const { MINE_RATE } = require('../config');
const cryptoHash = require('../util/crypto-hash');
const hexToBinary = require ('hex-to-binary');


/*
*
*
*/

describe('Block', () => {
	const timestamp =  2000;
	const lastHash = 'foo-hash';
	const hash = 'bar-hash';
	const data = ['blockhain', 'data'];
	const nonce = 1;
	const difficulty = 1;



	const block = new Block({
		timestamp: timestamp,
		lastHash: lastHash,
		hash: hash,
		data: data,
		nonce: nonce,
		difficulty: difficulty
	});

	it('has a timestamp, lastHash, hash, and data property', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
		expect(block.nonce).toEqual(nonce);
		expect(block.difficulty).toEqual(difficulty);

	});

	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({ lastBlock, data });

		it('returns a Block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});

		it('sets a `timestamp`', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		});

		it('creates a SHA 256 `hash` based on the proper inputs', () => {
			expect(minedBlock.hash).toEqual(
				cryptoHash(
					minedBlock.timestamp,
					minedBlock.nonce,
					minedBlock.difficulty,
					lastBlock.hash,
					data))
		});

		it('sets of `hash` that matches the difficulty of criteria', () => {
			expect(hexToBinary(minedBlock.hash).substr(0, minedBlock.difficulty))
				.toEqual('0'.repeat(minedBlock.difficulty));
		});

		it('sets the difficulty', () => {
			const possibleResults = [lastBlock.difficulty+1, lastBlock.difficulty-1];
			expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
		})
	});

	describe('adjustDifficulty()', () => {

		it('raises difficulty for quickly mined block', () => {
			expect(Block.adjustDifficulty({
				originalBlock: block, timestamp: block.timestamp + MINE_RATE - 100
			})).toEqual(block.difficulty + 1);
		});

		it('lowers difficulty for slowly mined block', () => {
			expect(Block.adjustDifficulty({
				originalBlock: block, timestamp: block.timestamp + MINE_RATE + 100
			})).toEqual(block.difficulty - 1)
		});

		it('has floor limit of 1', () => {
			block.difficulty = -1;
			expect(Block.adjustDifficulty({ originalBlock: block})).toEqual(1);
		})

	})
});