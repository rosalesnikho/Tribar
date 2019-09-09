const Block  = require('./Block');

describe('Block', () => {
	const timestamp =  'a-data';
	const lastHash = 'foo-hash';
	const hash = 'bar-hash';
	const data = ['blockhain', 'data'];


	const block = new Block({
		timestamp: timestamp,
		lastHash: lastHash,
		hash: hash,
		data: data
	});

	it('has a timestamp, lastHash, hash, and data property', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
	});

	describe('mineBloc()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({ lastBlock, data });

		it('returns a Block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});
	})
});