import React from 'react';

const Transaction = ({ transaction}) => {
    const { input, outputMap } = transaction;
    const recipients = Object.keys(outputMap);

    return (
        <div>
            <div className="transaction-wrapper">
                <div>From: {`${input.address.substring(0, 15)}...`} | Balance: {input.amount}</div>
            </div>
            {
                recipients.map(recipient => (
                        <div key={recipient}>To: {`${recipient.substring(0,15)}...`} | Sent: {outputMap[recipient]}</div>
                ))
            }
        </div>
    )
};

export default Transaction;