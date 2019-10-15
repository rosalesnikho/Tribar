import React, { Component } from 'react';
import Blocks from './Blocks'

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
				<h3>Tribar</h3>
				<p>Address: {address}</p>
				<p>Balance: {balance}</p>
			</div>
		);
	}
}

export default App;