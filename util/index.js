const EC = require('elliptic').ec;
const cryptoHash = require('./crypto-hash');


const eC = new EC('secp256k1');


/*
*
* Verify valid signatures and invalidate un verified signatures when
* creating a Wallet transaction within the network
*
*/
const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = eC.keyFromPublic(publicKey, 'hex');
    return keyFromPublic.verify(cryptoHash(data), signature)
};

module.exports = { eC, verifySignature, cryptoHash };