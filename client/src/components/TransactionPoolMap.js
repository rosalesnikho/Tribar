import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navigation from "./common/Navigation";
import Transaction from "./Transaction";
import Footer from "./common/Footer";
import ConductTransaction from "./ConductTransaction";

class TransactionPoolMap extends Component {
    state = { transactionPoolMap: {}};

    fetchTransactionPoolMap = () => {
        fetch('http://localhost:3000/api/tpm')
            .then(response => response.json())
            .then(json => this.setState({transactionPoolMap: json}))
    };


    componentDidMount() {
        this.fetchTransactionPoolMap()
    }

    render() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <h5>Transaction Pool</h5>
                    {
                        Object.values(this.state.transactionPoolMap).map(transaction => {
                            return (
                                <div key={transaction.id}>
                                    <hr/>
                                    <Transaction transaction={transaction} />
                                </div>
                            )
                        })
                    }
                    <Footer/>
                </div>
            </div>

        );
    }
}

export default TransactionPoolMap;