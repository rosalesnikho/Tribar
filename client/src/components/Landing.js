import React, {Component} from 'react';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="section-main-landing">
                    <div className="container">
                        <div className="row">
                            <div className="columns six">
                                <h1 className="tribar-main-text">TRIBAR</h1>
                                <h5>Blockchain <span className="plus-accent">+</span> Crypto <span
                                    className="plus-accent">+</span> Wallet</h5>
                                <p>A starter kit for your blockchain projects. Tribar is a fully functional blockchain
                                    built in NodeJS.</p>
                                <a href="https://github.com/rosalesnikho/Tribar" className="button">Get Started</a> <a
                                href="/documentation" className="button">Learn More</a>
                            </div>
                            <div className="columns six landing-image-wrapper">
                                <img className="landing-image" src={require('/img/penrose-square.png')}
                                     alt="tribar logo"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Landing Page*/}
                <div className="section-key-features skewed-bg">
                    <div className="container content">
                        {/* Features */}
                        <h3>Key Features</h3>
                        <div className="row">
                            <div className="columns three section-features">
                                <img src={require('/img/block-large.png')} alt=""/>
                                <h6>Networked Blockchain</h6>
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
                                    <li>Download or Clone the Tribar Repo</li>
                                    <li>Inside the project folder of Tribar - type: <b>npm install</b></li>
                                    <li>Inside the project folder of Tribar - type: <b>npm run dev</b></li>
                                    <li>Visit localhost:3000 on your browser to visualize blockchain</li>
                                </ul>
                                <a href="https://github.com/rosalesnikho/Tribar" className="button">Download</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-contact-me">
                    {/*    Contact Me Section */}
                    <div className="container">
                        <div className="row">
                            <div className="columns six">
                                <h3>Looking for expert advice for your blockchain project?</h3>
                                <p>Tribar is for experienced developers that have firm grasp of NodeJS deployment and development. In order to fully utilize Tribar, you must know how to deploy multiple NodeJS instances. However, if you need
                                    help setting up an instance of Tribar, blockchain advice, or deployment send me a note!</p>
                                <a href="mailto:contact@tribar.xyz?subject=re: Tribar.xyz | Inquiry" className="button">Let's Talk</a>
                            </div>
                            <div className="columns six get-started">
                                <img src={require('/img/email-settings.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;