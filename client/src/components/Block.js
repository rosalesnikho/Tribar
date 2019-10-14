import React, {Component} from 'react';

class Block extends Component {
    // Set initial state of the Block component
    state = { displayTransaction: false };

    // Toggles the showing of more data
    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.setState.displayTransaction })
    }

    // Getter for displaying transactional data from the block
    get displayTransaction() {
        const { data } = this.props.block;

        // Data render & stringify
        // Checks length is > 15 characters
        const stringData = JSON.stringify(data);
        const dataRender = stringData.length > 35 ?
            `${stringData.substring(0, 35)}...` : stringData;

        if (this.state.displayTransaction) {
            return (
                <div>
                    {JSON.stringify(data)}
                    <br />
                    <button className="button-primary" onClick={this.toggleTransaction}>View Less</button>
                </div>
            )
        }

        return (
            <div>
                <div>Data: {dataRender}</div>
                <button className="button-primary" onClick={this.toggleTransaction}>View More</button>
            </div>
        );
    }

    render() {
        const { timestamp, hash } = this.props.block;

        // Hash render & stringify
        const hashDisplay = `${hash.substring(0, 15)}...`;



        return (
            <div className='Block'>
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: { new Date (timestamp).toLocaleString()}</div>
                {this.displayTransaction}
            </div>
        );
    }
}

export default Block;