import { gql } from 'apollo-boost';

const getWishesQuery = gql`
    {
        wishes {
            title,
            id
        }
    }
`

const getWishesForMemberQuery = gql`
    query($id: ID) {
        member(id: $id) {
            wishes {
                title,
                description,
                links,
                createdAt,
                id
            }
        }
    }
`

const getMemberByFBidQuery = gql`
    query($fbid: String){
        memberByFBid(fbid: $fbid) {
            firstname,
            lastname,
            id,
            fbid
        }
    }
`

const addMemberMutation = gql`
    mutation($firstname: String!, $lastname: String!, $email: String!, $fbid: String!) {
        addMember(firstname: $firstname, lastname: $lastname, email: $email, fbid: $fbid) {
            firstname,
            lastname,
            id,
            fbid
        }
    }
`

const addWishMutation = gql`
    mutation($title: String!, $description: String!, $links: String!, $memberId: String!, $wishStatus: String!, $createdAt: String!) {
        addWish(title: $title, description: $description, links: $links, memberId: $memberId, wishStatus: $wishStatus, createdAt: $createdAt){
            title,
            id,
            status
        }
    }
`

export {
    getWishesQuery,
    addWishMutation,
    addMemberMutation,
    getMemberByFBidQuery,
    getWishesForMemberQuery
}