import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { getMemberByFBidQuery } from '../queries/queries';
import { graphql, compose } from 'react-apollo';

// components
import Navbar from './layouts/Navbar';
import Dashboard from './dashboard/dashboard';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import CreateWish from './wishes/CreateWish'

class RouterComponentGuts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        }
    }

    render() {
        const { loading, error } = this.props.getMemberByFBidQuery;

        if (loading) {
            return (<p>Loading...</p>);
        } else if (error) {
            return (<p>Error!</p>);
        }
        console.log('router.js: ', this.props);
        //const { firebase } = this.props;
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar props={this.props} />
                    <Switch>
                        <Route exact path='/' render={() => <Dashboard {...this.props} />} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/signin' component={Signin} />
                        <Route path='/create' render={() => <CreateWish {...this.props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const RouterComponent = withFirebase(RouterComponentGuts);

export default compose(
    graphql(getMemberByFBidQuery, {
        name: "getMemberByFBidQuery",
        options: (props) => {
            console.log('App theseProps: ', props);
            return {
                variables: {
                    fbid: props.firebase.auth.O
                }
            }
        }
    }),
)(RouterComponent)
