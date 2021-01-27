import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Helmet } from 'react-helmet-async'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { ALL_BOOKS } from '../queries/bookQueries'
import BooksTable from './BooksTable'

const Books = () => {
  const [ books, setBooks ] = useState([])
  const [ genre, setGenre] = useState(null)
  const [getAllBooks, getAllBooksResults] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getAllBooks({ variables: genre })
  }, [genre, getAllBooks])

  useEffect(() => {
    const { called, data, networkStatus } = getAllBooksResults
    if (called && networkStatus > 6) {
      const books = data ? data.allBooks : []
      setBooks(books)
    }
  }, [getAllBooksResults])

  return (
    <>
      <Helmet>
        <title>GraphQL Library | Books</title>
      </Helmet>
      <Container>
        <Row className='my-4'>
          <Col>
            <h1 className='d-inline h2 mr-2'>Books</h1>
            {getAllBooksResults.loading && (
              <Spinner animation='grow' variant='info' role='status' size='sm'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            )}
            <hr />

            {books.length > 0 && <BooksTable books={books} />}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Books