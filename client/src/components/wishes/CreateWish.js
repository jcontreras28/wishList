import React, { Component } from 'react'
import moment from 'moment'
import { Redirect, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { addWishMutation, getWishesForMemberQuery } from '../../queries/queries';

const INITIAL_STATE = {
    title: '',
    description: '',
    links: '',
    error: null
}

class CreateWishGuts extends Component {
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
        const { memberByFBid, loading, error } = this.props.getMemberByFBidQuery;
        const { title, description, links } = this.state;
        const memberId = memberByFBid.id;
        console.log('*********** this.state: ', this.state);
        this.props.addWishMutation({
            variables: {
                title: title,
                description: description,
                links: links,
                memberId: memberId,
                wishStatus: 'availble',
                createdAt: moment()
            },
            refetchQueries: [{ query: getWishesForMemberQuery }]
        })
            .then(newWish => {
                console.log('newWish: ', newWish);
            })
            .catch(error => {
                console.log('error: ', error.message);
                this.state({ error: error.message });
            });
        e.preventDefault();
        this.props.history.push('/');
        // this.props.createWish(this.state)
        // this.props.history.push('/');
    }
    render() {
        const {
            title,
            error,
        } = this.state;

        const isInvalid =
            title === '';

        console.log('in createwish: ', this.props);
        const { firebase } = this.props;
        if (!firebase.auth.O) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Create Wish
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Wish Description</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="links">Any Webpage Urls to share</label>
                        <textarea id="links" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button disabled={isInvalid} className="btn pink lighten-1 z-depth-0">
                            Save Wish!
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

const CreateWish = withRouter(CreateWishGuts);

export default graphql(addWishMutation, { name: "addWishMutation" })(CreateWish)
