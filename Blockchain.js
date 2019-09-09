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
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for(let i = 1; i < chain.length; i++ ) {
            const block = chain[i];
            const correctLastHash = chain[i-1].hash;
            const { timestamp, lastHash, hash, data } = block;

            if( lastHash !== correctLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data);

            if(hash !== validatedHash) return false;
         }

        return true;
    }
}

module.exports = Blockchain;