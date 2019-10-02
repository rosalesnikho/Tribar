

class TransactionMiner {

    constructor({ blockchain, transactionPool, wallet, pubsub }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }

    mineTransaction() {
        // Get the transaction pool's valid transaction

        // Generate the miner's reward

        // add a block consisting of transactions to the block chain

        // broadcast the updated block chain

        // clear the transaction pool
    }
}

module.exports = TransactionMiner;