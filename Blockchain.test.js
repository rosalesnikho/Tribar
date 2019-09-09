const Blockchain = require('./Blockchain');
const Block = require('./Block');

describe('Blockhain', () => {
    let blockChain;

    beforeEach(() => {
        blockChain = new Blockchain();
    });

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
    });

    describe('isValidChain()', () => {
        describe('when the chain does not start the genesis block', () => {
            it('returns false', () => {
                blockChain.chain[0] = {data: 'fake-genesis'};
                expect(Blockchain.isValidChain(blockChain.chain)).toBe(false);
            });
        });

        //
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockChain.addBlock({data: 'bears'});
                blockChain.addBlock({data: 'beets'});
                blockChain.addBlock({data: 'battlestar galactica'});
            });
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockChain.chain[2].lastHash = 'broken-lastHash';
                    expect(Blockchain.isValidChain(blockChain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockChain.chain[2].data = 'bad-and-evil-data';
                    expect(Blockchain.isValidChain(blockChain.chain)).toBe(false);
                })
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockChain.chain)).toBe(true);
                });
            });
        });
    });

});

