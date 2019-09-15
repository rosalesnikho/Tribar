const bodyParses = require('body-parser');
const express = require ('express');
const Blockchain = require('./Blockchain');
const PubSub = require('./pubsub');

// Instantiate Express application
const app  = express();
const blockChain = new Blockchain();
const pubSub = new PubSub({blockChain});

setTimeout(() => pubSub.broadcastChain(), 1000);

// Uses body parses to receive and send JSON
app.use(bodyParses.json());


// Get request to read block chain data
app.get('/api/blocks', (req, res ) => {
	res.json(blockChain.chain)
});


// Post Request to send new instances of a block
app.post('/api/mine', (req, res) => {
	 const {data} = req.body;
	 blockChain.addBlock({ data });

	 // Once block chain is added redirects to /api/blocks end point
	 res.redirect('/api/blocks');
});


// Port Setup
const port = 3000;
app.listen(port, () => console.log('Listening at port: ' + port));

