import React, {Component} from 'react';
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";
import history from "../history";

class ConductTransaction extends Component {

    state = { recipient: '', amount: 0 };

    componentDidMount() {
        fetch('http://localhost:3000/api/wallet-info')
            .then(res => res.json())
            .then(data => this.setState({ walletInfo: data }));

    }

    updateRecipient = (event) => {
        this.setState({ recipient: event.target.value})
    };

    updateAmount = (event) => {
        this.setState({ amount: Number(event.target.value) })
    };

    conductTransaction = (event) => {
        event.preventDefault()
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/tpm');
            });
    };

    render() {

        return (
            <div>
                <Navigation/>
                <div className="section-transaction">
                    <div className="container">
                        <div className="row">
                            <form method="post">
                                <div className="columns three">
                                    <input type="text"
                                           placeholder="Enter Address"
                                           value={ this.state.recipient }
                                           onChange={ this.updateRecipient } />
                                </div>

                                <div className="columns three">
                                    <input type="number"
                                           placeholder="Enter Amount"
                                           value={ this.state.amount }
                                           onChange={ this.updateAmount } />
                                </div>

                                <div className="row">
                                    <div className="columns three">
                                        <input className="button-primary" type="submit" onClick={this.conductTransaction}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default ConductTransaction;