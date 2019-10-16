import React, { Component } from 'react';
import Navigation from "./common/Navigation";
import Landing from './Landing';
import Footer from './common/Footer';

class App extends Component {
	state = { walletInfo: {}};

	componentDidMount() {
			fetch('http://localhost:3000/api/wallet-info')
				.then(res => res.json())
				.then(data => this.setState({ walletInfo: data}));

	}

	render() {
		const { address, balance } = this.state.walletInfo;

		return (
			<div>
				<Navigation />
				<Landing />
				<div className="container">
					<h5>Current Balance</h5>
					<p>Address: {address}</p>
					<p>Balance: {balance}</p>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;