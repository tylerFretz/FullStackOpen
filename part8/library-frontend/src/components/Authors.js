import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Helmet } from 'react-helmet-async'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { ALL_AUTHORS } from '../queries/authorQueries'

import AuthorsTable from './AuthorsTable'
import AuthorsForm from './AuthorsForm'

const Authors = () => {
  const [ authors, setAuthors ] = useState([])
  const allAuthors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    const { called, networkStatus, data } = allAuthors
    if (called && networkStatus > 6) {
      const newAuthors = data ? data.allAuthors : authors
      setAuthors(newAuthors)
    }
  }, [authors, allAuthors])


  return (
    <>
      <Helmet>
        <title>GraphQL Library | Home</title>
      </Helmet>

      <Container>
        <Row className='my-4'>
          <Col>
            <h1 className="d-inline h2 mr-2">Authors</h1>
            {allAuthors.loading && (
              <Spinner variant="info" animation="grow" role="status" size="sm">
                <span className='sr-only'>Loading...</span>
              </Spinner>
            )}
            <hr />
            
            {authors.length > 0 && (
              <>
                <AuthorsForm authors={authors} />
                <AuthorsTable authors={authors} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Authors