import React from 'react';
import { Link  } from  'react-router-dom'

const Navigation = () => {
    return (
        <div>
            <nav className='top-nav'>
                <div className="container">
                    <ul className='nav-ul'>
                        <li className='nav-li'><Link to='/'>Home</Link></li>
                        <li className='nav-li'><Link to='/blocks'>Blocks</Link></li>
                        <li className='nav-li'><Link to='/transactions'>Transactions</Link></li>
                        <li className='nav-li'><Link to='/tpm'>TPM</Link></li>
                        <li className='nav-li'><Link to='/documentation'>Docs</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default Navigation;