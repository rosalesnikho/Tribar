const Block = require('./Block');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');
const { cryptoHash } = require('../util/');
const { REWARD_INPUT, MINING_REWARD } = require('../config');

class Blockchain {
    constructor () {
        this.chain = [Block.genesis()];
    }

    /*
    *
    * Add New Chain Block method
    *
    */
    addBlock({ data }) {
        const newDataBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newDataBlock);
    }

     /*
      *
      * @method replaceChain() - replaces the chain when compared to ensure the
      * latest valid chain is used throughout the network
      * @param chain - passed as an argument to replace the chain array once verified to be valid
      *
      */

    replaceChain(chain, validateTransactions, onSuccess) {
        
        if(chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        }

        if(!Blockchain.isValidChain(chain)) {
            console.error('The incoming chain must be valid');
            return
        }

        if (validateTransactions && !this.validTransactionData({ chain })) {
            console.error('The incoming chain has invalid data');
            return;
        }

        if(onSuccess) onSuccess();
        console.log('replace chain with: ', chain);
        this.chain = chain;
    }


    /*
	 *
	 *
	 *
	 *
	 * */
    validTransactionData({ chain }) {

        for (let i=1; i<chain.length; i++) {

            const block = chain[i];
            const transactionSet = new Set();
            let rewardTransactionCount = 0;

            for (let transaction of block.data) {
                if (transaction.input.address === REWARD_INPUT.address) {
                    rewardTransactionCount += 1;

                    if (rewardTransactionCount > 1) {
                        console.error('Miner rewards exceed limit');
                        return false;
                    }

                    if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
                        console.error('Miner reward amount is invalid');
                        return false;
                    }
                } else {
                    if (!Transaction.validTransaction(transaction)) {
                        console.error('Invalid transaction');
                        return false;
                    }

                    const trueBalance = Wallet.calculateBalance({
                        chain: this.chain,
                        address: transaction.input.address
                    });

                    if (transaction.input.amount !== trueBalance) {
                        console.error('Invalid input amount');
                        return false;
                    }

                    if (transactionSet.has(transaction)) {
                        console.error('An identical transaction appears more than once in the block');
                        return false;
                    } else {
                        transactionSet.add(transaction);
                    }
                }
            }
        }
        return true;
    }


    /*
    *
    * @method isValidChain - checks the validity of each chain
    * @param chain - is passed to check to valid chain block
    *
    */
    static isValidChain(chain) {

        // Validate position 0 to ensure it's the Genesis Block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }


        /*
        *
        *  Validate the rest of the chain by iterating over the entire chain starting in the
        *  first position because Chain 0 has already validated by the previous code.
        *
        */

        for(let i = 1; i < chain.length; i++ ) {
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
            const correctLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash !== correctLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash !== validatedHash) return false;
            if(Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }
}

module.exports = Blockchain;