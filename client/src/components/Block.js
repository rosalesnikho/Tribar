import React, {Component} from 'react';
import Transaction from './Transaction';

class Block extends Component {

    // Set initial state of the Block component
    state = { displayTransaction: false };

    // Toggles the showing of more data
    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction })
    };

    // Getter for displaying transactional data from the block
    get displayTransaction() {
        const { data } = this.props.block;

        // Data render & stringify
        // Checks length is > 15 characters
        const stringData = JSON.stringify(data);
        const dataRender = stringData.length > 30 ?
            `${stringData.substring(0, 30)}...` : stringData;

        if (this.state.displayTransaction) {
            return (
                <div>
                    {
                        data.map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    }
                    <br />
                    <button className='button-primary' onClick={this.toggleTransaction}>View Less</button>
                </div>
            )
        }

        return (
            <div>
                {/*<div>Data: {dataRender}</div>*/}
                <button className='button-primary' onClick={this.toggleTransaction}>View More</button>
            </div>
        );
    }

    render() {
        const { timestamp, hash } = this.props.block;
        const hashDisplay = `${hash.substring(0, 30)}...`;

        return (
            <div className='Block'>
                <div className="row transaction-block">
                    <div className="columns four align-text-middle">
                        <p><span className="bold-text align-text-middle">{hashDisplay}</span></p>
                    </div>
                    <div className="columns three align-text-middle">
                        <p><span className="bold-text ">{ new Date (timestamp).toLocaleString()}</span></p>
                    </div>
                    <div className="columns four align-text-middle">
                        {this.displayTransaction}
                    </div>
                </div>
            </div>
        );
    }
}

export default Block;