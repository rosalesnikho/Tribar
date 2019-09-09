const Block = require('./Block');

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
}

module.exports = Blockchain;