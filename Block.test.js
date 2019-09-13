
/*
*
*
*/
const Block  = require('./Block');
const cryptoHash = require('./crypto-hash');


/*
*
*
*/

describe('Block', () => {
	const timestamp =  'a-data';
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
			expect(minedBlock.hash.substr(0, minedBlock.difficulty))
				.toEqual('0'.repeat(minedBlock.difficulty));
		})
	})
});