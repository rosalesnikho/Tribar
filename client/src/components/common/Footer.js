import React from 'react'

const Footer = () => {
    return(
        <div>
            <footer>
                <div className="container section-footer">
                    <div className="row">
                        <div className="columns four footer-sub">
                            <h5><span className="plus-accent">About</span></h5>
                            <p>All parts of Tribar are free to use and abuse under the open-source MIT license</p>
                        </div>
                        <div className="columns four footer-sub">
                            <h5><span className="plus-accent">Quick Links</span></h5>
                            <ul>
                                <li><a href="https://github.com/rosalesnikho/Tribar">GitHub Repo</a></li>
                                <li><a href="https://www.nikrosales.dev">NikRosales.dev</a></li>
                                <li><a href="/documentation">Documentation</a></li>
                            </ul>
                        </div>
                        <div className="columns four footer-sub">
                            <h5><span className="plus-accent">Resources</span></h5>
                            <ul>
                                <li><a href="https://devcenter.heroku.com/articles/github-integration">Heroku Deployment</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Footer