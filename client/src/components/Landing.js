import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="section-main-landing">
                    <div className="container">
                        <div className="row">
                            <div className="columns six">
                                <h3>Tribar</h3>
                                <h5>Blockchain + Cryptocurrency + Wallet</h5>
                                <p>A starter kit for your blockchain projects</p>
                                <a href="https://github.com/rosalesnikho/Tribar" className="button">Get Started</a>
                            </div>
                            <div className="columns six landing-image-wrapper">
                                <img className="landing-image" src={require('/img/penrose-square.png')}
                                     alt="tribar logo"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Landing Page*/}

                <div className="section-key-features">
                    <div className="container">
                        {/* Features */}
                        <h3>Key Features</h3>
                        <div className="row">
                            <div className="columns three section-features">
                                <img src={require('/img/block-large.png')} alt=""/>
                                <h6>Fully Functional Blockchain</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/value.png')} alt=""/>
                                <h6>Mine Cryptocurrency</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/shield.png')} alt=""/>
                                <h6>51% Attack Protection</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/wallet.png')} alt=""/>
                                <h6>Crypto Wallet</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns three section-features">
                                <img src={require('/img/scalable.png')} alt=""/>
                                <h6>Scalable</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/checklist.png')} alt=""/>
                                <h6>Tested with JEST</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/api.png')} alt=""/>
                                <h6>API End Points</h6>
                            </div>
                            <div className="columns three section-features">
                                <img src={require('/img/checked.png')} alt=""/>
                                <h6>Transaction Validation</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-get-started">
                    <div className="container">
                        {/*  How to get started  */}
                        <div className="row">
                            <div className="columns six get-started">
                                <img src={require('/img/flasks.png')} alt=""/>
                            </div>
                            <div className="columns six">
                                <h3>Get started with Tribar</h3>
                                <ul className="get-started-list">
                                    <li>Install NodeJS</li>
                                    <li><a href="https://github.com/rosalesnikho/Tribar">Download or Clone the Tribar Repo</a></li>
                                    <li>Inside the project folder of Tribar - type: npm install</li>
                                    <li>Inside the project folder of Tribar - type: npm run dev</li>
                                    <li>Visit localhost:3000 on your browser to visualize blockchain</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;