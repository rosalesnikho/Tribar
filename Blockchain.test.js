const Blockchain = require('./Blockchain');
const Block = require('./Block');

describe('Blockhain', () => {
    const blockChain = new Blockchain();

    it('contains a `chain` of Array instance', () => {
        expect(blockChain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newDataBlock = 'Data Block';
        blockChain.addBlock({data: newDataBlock});
        expect(blockChain.chain[blockChain.chain.length-1].data).toEqual(newDataBlock)
    })
});

