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
							<div className="row blocks-label">
								<div className="columns four"><h6>Hash</h6></div>
								<div className="columns three"><h6>Timestamp</h6></div>
								<div className="columns four"><h6>Details</h6></div>
							</div>
							{
								this.state.blocks.map(block => {
									return (
										<div>
											<div className="individual-block">
												<Block key={block.hash} block={block} />
											</div>
										</div>
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