const Block = require('./Block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor () {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newDataBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newDataBlock);
    }

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