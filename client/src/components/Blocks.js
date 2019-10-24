import React, {Component} from 'react';
import Block from './Block'
import Navigation from "./common/Navigation";
import Footer from "./common/Footer";


class Blocks extends Component {
    state = {blocks: []};

    componentDidMount() {
        fetch('http://localhost:3000/api/blocks')
            .then(res => res.json())
            .then(data => this.setState({blocks: data}))
    }

    render() {
        console.log(this.state.blocks)
        return (
            <div>
                <Navigation/>
                <div className="section-all-blocks">
                    <div className="container">
                        <h3>Wallet Transaction Information</h3>
                        <p>Tribar instances are currently deployed across three servers. Each server can serve as a point of entry of transactions
                            and is automatically propagated across other instances. The list below represents all the blocks currently in the Tribar network. </p>
                        <div className="row blocks-label">
                            <div className="columns four block-hash-label"><h6>Hash</h6></div>
                            <div className="columns three block-time-label"><h6>Timestamp</h6></div>
                            <div className="columns four block-details-label"><h6>Transaction Details</h6></div>
                        </div>
                        {
                            this.state.blocks.map(block => {
                                return (
                                    <div>
                                        <div className="individual-block">
                                            <Block key={block.hash} block={block}/>
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