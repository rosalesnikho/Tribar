import React, {Component} from 'react';

class Block extends Component {
    render() {
        const { timestamp, hash, data } = this.props.block;
        // Hash render & stringify
        const hashDisplay = `${hash.substring(0, 15)}...`;

        // Data render & stringify
        // Checks length is > 15 characters
        const stringData = JSON.stringify(data);
        const dataRender = stringData.length > 35 ?
            `${stringData.substring(0, 35)}...` : stringData;

        return (
            <div className='Block'>
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: { new Date (timestamp).toLocaleString()}</div>
                <div>Data: {dataRender}</div>
            </div>
        );
    }
}

export default Block;