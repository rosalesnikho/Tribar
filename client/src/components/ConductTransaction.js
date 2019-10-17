import React, {Component} from 'react';
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";

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

    render() {

        return (
            <div>
                <Navigation/>
                <div className="section-transaction">
                    <div className="container">
                        <div className="row">
                            <form action="" method="post">
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
                                        <input className="button-primary" type="submit" value="Submit" />
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