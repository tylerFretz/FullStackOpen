import { gql } from '@apollo/client'

export const GET_AUTH_USER = gql`
    query getAuthUser {
        me {
            username
            favouriteGenre
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`