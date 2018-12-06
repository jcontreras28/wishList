import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getWishesForMemberQuery } from '../../queries/queries';
import MyWishSummary from './MyWishSummary'
import { Link } from 'react-router-dom'

class WishList extends Component {
    displayWishes() {
        console.log('in wishlist: ', this.props);
        const { member, loading, error } = this.props.data

        if (loading) {
            return (<div>Loading Wishes</div>);
        } else if (error) {
            return (<div>Error!</div>);
        } else {
            if (member.wishes.length === 0) {
                return (<div>No wishes yet...</div>);
            } else {
                return member.wishes.map(wish => {
                    console.log('wish: ', wish);
                    return (
                        <Link to={'/wish/' + wish.id} key={wish.id} >
                            <MyWishSummary wish={wish} />
                        </Link>
                    )
                })
            }
        }
    }
    render() {

        return (
            <div id="main">
                <div className="container">
                    <ul id="wish-list">
                        {this.displayWishes()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default graphql(getWishesForMemberQuery, {
    options: (props) => {
        const memberProfile = props.memberProfile;
        console.log('in wishlistxx: ', memberProfile.id);
        return {
            variables: {
                id: memberProfile.id
            }
        }
    }
})(WishList);