import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Redirect, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { ALL_BOOKS } from '../queries/bookQueries'
import useAuthUser from '../hooks/useAuthUser'
import BooksTable from './BooksTable'

const Recommendations = () => {
    const [books, setBooks] = useState([])
    const getAllBooks = useQuery(ALL_BOOKS)
    const { user, hasSyncAuth } = useAuthUser()
    const { pathname } = useLocation()
    

    useEffect(() => {
        const { called, data, networkStatus } = getAllBooks
        if (called && networkStatus > 6) {
            const newBooks = data ? data.allBooks : books
            setBooks(newBooks)
        }
    }, [getAllBooks, books])



    if (!hasSyncAuth)
        return null

    if (hasSyncAuth && !user) 
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: pathname }
                }}
            />
        )
    
    const booksToShow = books.filter((b) =>
        b.genres.includes(user.favouriteGenre)
    )

    return (
        <>
            <Helmet>
                <title>GraphQL Library | Recommendations</title>
            </Helmet>
            <Container>
                <Row className='my-4'>
                    <Col>
                        <h1 className='d-inline h2 mr-2'>Books</h1>
                        {getAllBooks.loading && (
                        <Spinner animation='grow' variant='info' role='status' size='sm'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                        )}
                        <hr />

                        {books.length === 0 && (
                            <h2 className="d-inline h2 mb-3 mr-2">
                                No match your favourite genre. Our db sucks...
                            </h2>
                        )}

                        {books.length > 0 && (
                            <BooksTable books={booksToShow} />
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Recommendations