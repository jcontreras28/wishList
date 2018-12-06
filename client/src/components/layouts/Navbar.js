import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = (props) => {
    const { firebase } = props;
    const links = firebase.auth.O ? <SignedInLinks /> : <SignedOutLinks />
    return (

        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className='brand-logo'>WishList</Link>
                {links}
            </div>
        </nav>
    )
}

// withRouter allows grabbing props - and this is how you use 'higher order components'
export default withFirebase(Navbar);