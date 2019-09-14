const express = require ('express');
const Blockchain = require('./Blockchain');

const app  = express();
const blockChain = new Blockchain();

app.get('/api/blocks', (req, res ) => {
	res.json(blockChain.chain)


});
const port = 3000;

app.listen(port, () => console.log('Listening at port: ' + port));

