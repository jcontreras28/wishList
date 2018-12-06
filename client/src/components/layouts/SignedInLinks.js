import React from 'react'
import { NavLink } from 'react-router-dom'
import { withFirebase } from '../Firebase';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/create'>New Wish</NavLink></li>
            <li><a onClick={props.firebase.doSignOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>JC</NavLink></li>
        </ul>
    )
}


export default withFirebase(SignedInLinks)