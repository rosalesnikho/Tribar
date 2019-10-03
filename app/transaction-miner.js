const Transaction = require('../wallet/transaction');


class TransactionMiner {
    constructor({ blockChain, transactionPool, wallet, pubSub }) {
        this.blockChain = blockChain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubSub = pubSub;
    }

    mineTransactions() {
        // Get the transaction pool's valid transaction
        const validTransactions = this.transactionPool.validTransactions();

        // Generate the miner's reward
        validTransactions.push(
            Transaction.rewardTransaction({ minerWallet: this.wallet })
        );

        // add a block consisting of transactions to the block chain
        this.blockChain.addBlock({ data: validTransactions });

        // broadcast the updated block chain
        this.pubSub.broadcastChain();

        // clear the transaction pool
        this.transactionPool.clear();
    }
}

module.exports = TransactionMiner;