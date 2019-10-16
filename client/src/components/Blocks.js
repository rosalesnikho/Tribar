import React, {Component} from 'react';
import Block from './Block'
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";


class Blocks extends Component {
	state = { blocks: [] };

	componentDidMount() {
		fetch('http://localhost:3000/api/blocks')
			.then(res => res.json())
			.then(data => this.setState({ blocks: data }))
	}

	render() {
		return (
			<div>
				<Navigation/>
					<div className="section-all-blocks">
						<div className="container">
							<h3>All Network Blocks Array</h3>
							{
								this.state.blocks.map(block => {
									return (
										<Block key={block.hash} block={block} />
									)
								})
							}
						</div>
					</div>
				<Footer/>
			</div>

		);
	}
}

export default Blocks;