const Transaction = require('./transaction');
const Wallet = require('./index');
const { verifySignature } = require('../util');


describe('Wallet', () => {

   let wallet;

   beforeEach(() => {
       wallet = new Wallet();
   });

   it('has a `balance`', () => {
        expect(wallet).toHaveProperty('balance');
   });

   it('has a `publicKey`', () => {
        expect(wallet).toHaveProperty('publicKey')
   });

    //
    describe('createTransaction()', () => {
        describe('the amount exceeds the balance', () => {
            it('throws an error', () => {
                expect(() => wallet.createTransaction({ amount: 9999999, recipient:'foo-recipient'}))
                    .toThrow('Amount exceeds balance');
            });
        });

        describe('and the amount is valid', () => {
            let transaction, amount, recipient;

            beforeEach(() => {

                // Test data remove later
                amount = 50;
                recipient = 'foo-recipient';
                transaction = wallet.createTransaction({ amount, recipient });

            });

            it('creates an instance of `Transaction`', () => {
                expect(transaction instanceof Transaction).toBe(true);
            });

            it('matches the transaction input with the wallet', () => {
                expect(transaction.input.address).toEqual(wallet.publicKey);
            });

            it('outputs the amount to the recipient', () => {
                expect(transaction.outputMap[recipient]).toEqual(amount);
            });
        });
    });
});