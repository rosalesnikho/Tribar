/*
*
*
*/
const MINE_RATE = 1000;

/*
* Mined block difficulty will be adjusted dynamically as the network detects
* mined block frequency
*/
const INITIAL_DIFFICULTY = 3;

/*
* Network Starting Currency balance
*/
const STARTING_BALANCE = 1000;

/*
* Starting block for the entire network
*
*/
const GENESIS_DATA = {
	timestamp: 1,
	lastHash: 'gen-last---',
	hash: 'gen-hash---',
	difficulty: INITIAL_DIFFICULTY,
	nonce: 0,
	data: []
};

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE };