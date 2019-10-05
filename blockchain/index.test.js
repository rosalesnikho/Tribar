const Blockchain = require('./index');
const Block = require('./Block');
const cryptoHash = require('../util/crypto-hash');
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

/*
 *
 */

describe('Blockhain', () => {
    let blockChain, newChain, originalChain, errorMock;

    beforeEach(() => {
        blockChain = new Blockchain();
        newChain = new Blockchain();
        errorMock = jest.fn();

        originalChain = blockChain.chain;
        global.console.error = errorMock;
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

    describe('replaceChain()', () => {

        let logMock;

        beforeEach(() => {
            logMock = jest.fn();

            global.console.log = logMock;
        });

        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };

                blockChain.replaceChain(newChain.chain);
            });

            it('does not replace the chain', () => {
                expect(blockChain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Bears' });
                newChain.addBlock({ data: 'Beets' });
                newChain.addBlock({ data: 'Battlestar Galactica' });
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockChain.replaceChain(newChain.chain);
                });

                it('does not replace the chain', () => {
                    expect(blockChain.chain).toEqual(originalChain);
                });

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the chain is valid', () => {
                beforeEach(() => {
                    blockChain.replaceChain(newChain.chain);
                });

                it('replaces the chain', () => {
                    expect(blockChain.chain).toEqual(newChain.chain);
                });

                it('logs about the chain replacement', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });

        describe('and the `validateTransactions` flag is true', () => {
            it('calls validTransactionData()', () => {
                const validTransactionDataMock = jest.fn();

                blockChain.validTransactionData = validTransactionDataMock;

                newChain.addBlock({ data: 'foo' });
                blockChain.replaceChain(newChain.chain, true);

                expect(validTransactionDataMock).toHaveBeenCalled();
            });
        });
    });

    describe('validTransactionData()', () => {
        let transaction, rewardTransaction, wallet;

        beforeEach(() => {
            wallet = new Wallet();
            transaction = wallet.createTransaction({ recipient: 'foo-address', amount: 65 });
            rewardTransaction = Transaction.rewardTransaction({ minerWallet: wallet });
        });

        describe('and the transaction data is valid', () => {
            it('returns true', () => {
                newChain.addBlock({ data: [transaction, rewardTransaction] });

                expect(blockChain.validTransactionData({ chain: newChain.chain })).toBe(true);
                expect(errorMock).not.toHaveBeenCalled();
            });
        });

        describe('and the transaction data has multiple rewards', () => {
            it('returns false and logs an error', () => {
                newChain.addBlock({ data: [transaction, rewardTransaction, rewardTransaction] });

                expect(blockChain.validTransactionData({ chain: newChain.chain })).toBe(false);
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('and the transaction data has at least one malformed outputMap', () => {
            describe('and the transaction is not a reward transaction', () => {
                it('returns false and logs an error', () => {
                    transaction.outputMap[wallet.publicKey] = 999999;

                    newChain.addBlock({ data: [transaction, rewardTransaction] });

                    expect(blockChain.validTransactionData({ chain: newChain.chain })).toBe(false);
                    expect(errorMock).toHaveBeenCalled();
                });
            });


        describe('and the transaction data has at least one malformed input', () => {
            it('returns false and logs an error', () => {
                wallet.balance = 9000;

                const evilOutputMap = {
                    [wallet.publicKey]: 8900,
                    fooRecipient: 100
                };

                const evilTransaction = {
                    input: {
                        timestamp: Date.now(),
                        amount: wallet.balance,
                        address: wallet.publicKey,
                        signature: wallet.sign(evilOutputMap)
                    },
                    outputMap: evilOutputMap
                };

                newChain.addBlock({ data: [evilTransaction, rewardTransaction] });

                expect(blockChain.validTransactionData({ chain: newChain.chain })).toBe(false);
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('and a block contains multiple identical transactions', () => {
            it('returns false and logs an error', () => {
                newChain.addBlock({
                    data: [transaction, transaction, transaction, rewardTransaction]
                });

                expect(blockChain.validTransactionData({ chain: newChain.chain })).toBe(false);
                expect(errorMock).toHaveBeenCalled();
            });
        });
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
});

