const PubNub = require('pubnub');

const credentials = {

	// !!!!!! Dev keys only, replace for production !!!!!!!
	publishKey: 'pub-c-ccc87f77-858e-4817-9682-0bab851604cd',
	subscribeKey: 'sub-c-40cead6c-d746-11e9-87c7-92ba2ff8bd78',
	secretKey: 'sec-c-MzdiMTNjNWItNTE1My00NjZhLWI2YzItOThjZjBlZDVmNGVl'
};

const CHANNELS = {
	TEST: 'TEST',
	BLOCKCHAIN: 'BLOCKCHAIN',
	TRANSACTION: 'TRANSACTION'
};

class PubSub {
	constructor({ blockChain, transactionPool, wallet }) {
		this.blockChain = blockChain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;

		this.pubnub = new PubNub(credentials);

		this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });

		this.pubnub.addListener(this.listener());
	}

	// broadcastChain() {
	// 	this.publish({
	// 		channel: CHANNELS.BLOCKCHAIN,
	// 		message: JSON.stringify(this.blockChain.chain)
	// 	});
	// }
	//
	//
	// broadcastTransaction(transaction) {
	// 	this.publish({
	// 		channel: CHANNELS.TRANSACTION,
	// 		message: JSON.stringify(transaction)
	// 	});
	// }

	subscribeToChannels() {
		this.pubnub.subscribe({
			channels: [Object.values(CHANNELS)]
		});
	}

	listener() {
		return {
			message: messageObject => {
				const { channel, message } = messageObject;
				console.log(`message received on channel: ${channel}. Message: ${message}`);
				const parsedMessage = JSON.parse(message);

				switch(channel) {
					case CHANNELS.BLOCKCHAIN:
						this.blockChain.replaceChain(parsedMessage,true, () => {
							this.transactionPool.clearBlockchainTransactions({
								chain: parsedMessage
							});
						});
						break;
					case CHANNELS.TRANSACTION:
						if (!this.transactionPool.existingTransaction({
							inputAddress: this.wallet.publicKey
						})) {
							this.transactionPool.setTransaction(parsedMessage);
						}
						break;
					default:
						return;
				}
			}
		}
	}

	publish({ channel, message }) {
		this.pubnub.publish({ message, channel });
	}

	broadcastChain() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockChain.chain)
		});
	}

	broadcastTransaction(transaction) {
		this.publish({
			channel: CHANNELS.TRANSACTION,
			message: JSON.stringify(transaction)
		});
	}
}


module.exports = PubSub;