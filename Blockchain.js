const Block = require('./Block');
const cryptoHash = require('./crypto-hash');

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

    replaceChain(chain) {
        
        if(chain.length <= this.chain.length) {
            return;
        }

        if(!Blockchain.isValidChain(chain)) {
            return
        }

        this.chain = chain;
    }


    /*
    *
    * @method isValidChain - checks the validity of each chain
    * @param chain - is passed to check to valid chain block
    *
    * */
    static isValidChain(chain) {

        // Validate position 0 to ensure it's the Genesis Block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }


        /*
        *  Validate the rest of the chain by iterating over the entire chain starting in the
        *  first position because Chain 0 has already validated by the previous code.
        */

        for(let i = 1; i < chain.length; i++ ) {
            const { timestamp, lastHash, hash,nonce, difficulty, data } = chain[i];
            const correctLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash !== correctLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

            if(hash !== validatedHash) return false;
            if(Math.abs(lastDifficulty - difficulty) > 1) return false;

                }

        return true;
    }
}

module.exports = Blockchain;