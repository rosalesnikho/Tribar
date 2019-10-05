<p align="center">
  <a href="https://www.tribar.io">
    <img alt="Tribar" src="https://i.imgur.com/KlPaqCk.png" width="60" />
  </a>
</p>
<h1 align="center">Tribar | Crypto + Wallet + Blockchain </h1>


This project is a Work In Progress (WIP) 

## ToDo:
- Design Front-End
- ReactJS Front-End

## The Back-End Stack
- Node JS
- Express
- PubNub
- Jest ( TDD )

## The Front-End Stack
- React JS 16.xx
- Redux
- Axios

## Completed so far
- Created the core wallet class for the cryptocurrency.

- Developed the cryptographic key pair and public key addressing system.

- Implementing signature generation and verification to make transactions official.

- Built the main transaction class - with the output map and input structure.

- Developed functionality to actually validate transactions.

- Tied transaction creation with the wallet class.

- Allowed transactions to be updated with multiple outputs to efficiently use existing objects.

- Improved the hash function to recognize objects with new properties as changes in incoming data.

- Covered edges cases with transaction updates to prevent vulnerabilities.

- Created the core transaction miner class to capture how miners should add transactions to the blockchain.

- Added the ability to grab valid transactions from the transaction pool.

- Added a way to clear blockchain transactions to ensure that only unique transaction objects could be recorded.

- Added a mining transactions endpoint to enable transaction mining through the API.

- Cleared recorded transactions on a successful replacement of the blockchain.

- Calculated the wallet balance based on the blockchain history.

- Applied these wallet balances whenever conducting a new transaction.

- Exposed the wallet information including the public key and balance through the API.

- Validated transaction data incoming into the blockchain.

- Validated incoming transaction input balances.

- Prevented duplicate transactions from appearing in a block’s data.

- Validated the entire transaction itself when accepting new user-contributed blockchains.