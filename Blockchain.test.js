const Blockchain = require('./Blockchain');
const Block = require('./Block');
const cryptoHash = require('./crypto-hash');

/*
 *
 *
 */

describe('Blockhain', () => {
    let blockChain, newChain, originalChain;

    beforeEach(() => {
        blockChain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockChain.chain;
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

            describe('and the chain contains a jumped difficulty', () => {
               it('returns false', () => {
                    const lastBlock = blockChain.chain[blockChain.chain.length-1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty -3;
                    const hash = cryptoHash({ timestamp, lastHash,  nonce, difficulty, data });
                    const badBlock = new Block({ timestamp, lastHash, hash, nonce, difficulty, data});

                    blockChain.chain.push(badBlock);

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

    //
    describe('replaceChain()', () =>{

        describe('When the new chain is not longer', () => {
            it('does not replace the chain', () => {
                newChain.chain[0] = { new: 'chain'};
                blockChain.replaceChain(newChain.chain);
                expect(blockChain.chain).toEqual(originalChain);
            });
        })
    });

    describe('when the new chain is longer', () => {

        //
        beforeEach(() => {
            newChain.addBlock({data: 'bears'});
            newChain.addBlock({data: 'beets'});
            newChain.addBlock({data: 'Battlestar Galactica'});
        });
        //
        describe('and the chain is invalid', () => {
            it('does not replace the chain', () => {
                newChain.chain[2].hash = 'fake-chain-hash';
                blockChain.replaceChain(newChain.chain);
            })
        });
        //
        describe('and the chain is valid', () => {
            it('replaces the chain', () => {
                blockChain.replaceChain(newChain.chain);
                expect(blockChain.chain).toEqual(newChain.chain);
            })
        })
    })
});

