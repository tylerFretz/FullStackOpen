import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const EDIT_BIRTH_YEAR = gql`
    mutation editBirthYear($name: String!, $born: Int!) {
        editBirthYear(
            name: $name,
            setBornTo: $born
        ) {
            name
            born
            bookCount
        }
    }
`