import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FirebaseContext, withFirebase } from '../Firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

class SignInForm extends Component {
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
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log('error: ', error);
                this.setState({ error: error.message });
            });
        e.preventDefault();
    }
    render() {
        const {
            error,
        } = this.state;

        const { firebase } = this.props;
        if (firebase.auth.O) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Log In
                    </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Login
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

const SignIn = withFirebase(SignInForm)

export default withFirebase(SignIn)
