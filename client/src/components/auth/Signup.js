import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { graphql, compose } from 'react-apollo';
import { addMemberMutation } from '../../queries/queries';

const INITIAL_STATE = {
    email: '',
    password1: '',
    password2: '',
    firstName: '',
    lastName: '',
    error: null
}

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        const { firstName, lastName, email, password1 } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password1)
            .then(authUser => {
                const fbId = authUser.user.uid;
                return this.props.addMemberMutation({
                    variables: {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        fbid: fbId
                    }
                });
            })
            .then(ourUser => {
                console.log('ourUser: ', ourUser);
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
        e.preventDefault();
    }
    render() {
        const {
            firstName,
            lastName,
            email,
            password1,
            password2,
            error,
        } = this.state;

        const isInvalid =
            password1 !== password2 ||
            password1 === '' ||
            email === '' ||
            firstName === '' ||
            lastName === '';

        const { firebase } = this.props;
        if (firebase.auth.O) return <Redirect to='/' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Sign Up
                    </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password1">Password</label>
                        <input type="password" id="password1" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password2">Password</label>
                        <input type="password" id="password2" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button disabled={isInvalid} className="btn pink lighten-1 z-depth-0">
                            Sign Up
                        </button>
                        <div className="red-text center">
                            {error ? <p>{error}</p> : null}
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

const SignUp = withFirebase(SignUpForm)

export default compose(
    graphql(addMemberMutation, { name: "addMemberMutation" }),
    // repeat for more queries.
)(SignUp)
