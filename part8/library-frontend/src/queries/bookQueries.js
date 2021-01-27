import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
            id
        }
        published
        genres
        id
    }
`

export const ALL_BOOKS = gql`
    query getAllBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`