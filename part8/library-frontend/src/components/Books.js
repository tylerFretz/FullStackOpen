import React, { useState, useEffect, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useUIDSeed } from 'react-uid'
import { Helmet } from 'react-helmet-async'
import Select from 'react-select'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { ALL_BOOKS } from '../queries/bookQueries'
import useGenres from '../hooks/useGenres'
import BooksTable from './BooksTable'

const Books = () => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const [getAllBooks, getAllBooksResults] = useLazyQuery(ALL_BOOKS)
  const seed = useUIDSeed()
  const { genres, hasGenres } = useGenres()

  useEffect(() => {
    getAllBooks({ variables: { genre } })
  }, [genre, getAllBooks])

  useEffect(() => {
    const { called, data, networkStatus } = getAllBooksResults
    if (called && networkStatus > 6) {
      const books = data ? data.allBooks : []
      setBooks(books)
    }
  }, [getAllBooksResults])

  const generateOptions = useCallback(() => {
    const defaultOption = [{ value: 0, label: 'all' }]

    let options = defaultOption

    if (hasGenres) {
      const genreOptions = genres.map((g, index) => {
        return { value: index + 1, label: g }
      })

      options = defaultOption.concat(genreOptions)
    }
    return options
  }, [genres, hasGenres])

  const filterByGenre = useCallback((option, action) => {
    const genre = option.label === 'all' ? null : option.label
    setGenre(genre)
  }, [])

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
            <Row className='mb-4 align-items-center'>
              <Col xs={12} className='mb-2'>
                <span id={seed('genre-filter')} className='lead'>
                  Filter books by genre:
                </span>
              </Col>
              <Col sm={10} md={5}>
                <Select
                  name='genres'
                  options={generateOptions()}
                  onChange={filterByGenre}
                  defaultValue={generateOptions()[0]}
                  aria-labelledby={seed('genre-filter')}
                  isLoading={getAllBooksResults.loading}
                />
              </Col>
            </Row>

            {books.length === 0 && (
              <h2 className="d-inline h2 mb-3 mr-2">No books match that filter</h2>
            )}

            {books.length > 0 && (
              <BooksTable books={books} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Books