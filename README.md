<p align="center">
  <a href="https://www.tribar.xyz">
    <img alt="Tribar" src="https://i.postimg.cc/Qt2LNSB9/penrose-square.png" width="60" />
  </a>
</p>
<h1 align="center">Tribar | Crypto + Wallet + Blockchain Starter Project</h1>


Start your own blockchain + crypto currency with Tribar! This is a starter repo for your very own blockchain, wallet and crypto currency
mining. Use the project however you wish for any application. 


## Key Features
- Fully functioning Blockchain 
- Ability to mine cryptocurrency with dynamic difficulty adjustment
- Launch multiple instances for a fully autonomous connected blockchain network
- API end points for mining, transactions, wallets and more
- Fully tested back-end using JEST, TDD.

## Code Climate Grades
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

## Requirements
1. NodeJS / NPM / Yarn

## How to get started ( Development )
1. Install NodeJS
1. Download or Clone this repo
1. Inside the project folder of Tribar - type: `npm install`
1. Inside the project folder of Tribar - type: `npm run dev`
1. Visit `localhost:3000 (also available on port: 1234` on your  browser to visualize blockchain

## The Back-End Stack
- Node JS
- Express
- PubNub (Account required)
- Jest ( TDD )

## The Front-End Stack
- React JS 16.xx

## Tribar Features List 
- Core wallet for the crypto currency.

- Ability for the cryptographic key pair and public key addressing system.

- Signature generation and verification to make transactions.

- Includes functionality to actually validate transactions.

- Ties transaction creation with the wallet class.

- Allows transactions to be updated with multiple outputs to efficiently use existing objects.

- Improves the hash function to recognize objects with new properties as changes in incoming data.

- Covers edges cases with transaction updates to prevent vulnerabilities.

- Creates the core transaction miner class to capture how miners should add transactions to the blockchain.

- Has the ability to grab valid transactions from the transaction pool.

- Clears blockchain transactions to ensure that only unique transaction objects could be recorded.

- Adds a mining transactions endpoint to enable transaction mining through the API.

- Clears recorded transactions on a successful replacement of the blockchain.

- Calculates the wallet balance based on the blockchain history.

- Applies wallet balances whenever conducting a new transaction.

- Exposes the wallet information including the public key and balance through the API.

- Validates transaction data incoming into the blockchain.

- Validates incoming transaction input balances.

- Prevents duplicate transactions from appearing in a block’s data.

- Validates the entire transaction itself when accepting new user-contributed blockchains.


## License 
All parts of Tribar are free to use and abuse under the `open-source MIT license`