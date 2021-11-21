import React from 'react'
import {Link} from 'react-router-dom'
import '../CSS/Nav.css'

function Navbar(){
    return(
        <nav className="nav">
            <div className="logo">
                <h3>IQAC</h3>
            </div>

            <ul className="links">
                <li>
                    <Link to='/'>
                        SignUp
                    </Link>
                </li>
                <li>
                    <Link to='/signin'>
                        SignIn
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;