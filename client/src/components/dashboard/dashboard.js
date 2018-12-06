import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';
import { withFirebase } from '../Firebase';
import { getMemberByFBidQuery } from '../../queries/queries';

import WishList from '../wishes/MyWishList';

const INITIAL_STATE = {
    memberProfile: {},
    error: null
}

class DashboardGuts extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    render() {
        console.log('look for loading: ', this.props);

        const { firebase } = this.props
        const { memberByFBid, loading, error } = this.props.getMemberByFBidQuery;

        if (loading) {
            return (<p>Loading...</p>);
        } else if (error) {
            return (<p>Error!</p>);
        }
        //console.log('memberProfilexx: ', memberByFBid);
        if (!firebase.auth.O) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <h4>My Wish List</h4>
                        <WishList memberProfile={memberByFBid} history={this.props.history} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <div>Hello</div>
                    </div>
                </div>
            </div>
        )
    }
}

const Dashboard = withFirebase(DashboardGuts)

export default Dashboard;