import React from 'react'
import moment from 'moment'

const MyWishSummary = ({ wish }) => {
    console.log('wihssummary: ', wish);
    return (
        <div className="card z-depth-0 wish-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                    {wish.title}
                </span>
                <p className="grey-text">{moment(wish.createdAt).calendar()}</p>
                <p>Edit</p>
                <p>Delete</p>
            </div>
        </div>
    )
}

export default MyWishSummary