import React, { Component } from 'react';
import Landing from './Landing';
import Navigation from "./common/Navigation";
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
				<Footer />
			</div>
		);
	}
}

export default App;