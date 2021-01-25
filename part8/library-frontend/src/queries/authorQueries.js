import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const EDIT_BIRTH_YEAR = gql`
    mutation editBirthYear($name: String!, $setBornTo: Int!) {
        editBirthYear(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
            id
        }
    }
`