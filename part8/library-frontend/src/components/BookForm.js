import React, { useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { Redirect, useLocation } from 'react-router-dom'
import { useUIDSeed, uid } from 'react-uid'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { ALL_AUTHORS } from '../queries/authorQueries'
import { ALL_BOOKS, ADD_BOOK } from '../queries/bookQueries'

import { resolveApolloErrors } from '../helpers/errorHelper'
import useAuthUser from '../hooks/useAuthUser'
import useYupValidationResolver from '../hooks/useYupValidationResolver'
import useNotification from '../hooks/useNotification'


const validationSchema = yup.object().shape({
    title: yup.string().min(2).required(),
    author: yup.string().min(2).required(),
    published: yup
        .number()
        .typeError('enter a publication year as a number')
        .integer()
        .required(),
    genre: yup.string()
})


const BookForm = () => {
    const [genres, setGenres] = useState([])
    const seed = useUIDSeed()
    const { user, hasSyncAuth } = useAuthUser()
    const { pathname } = useLocation()
    const validationResolver = useYupValidationResolver(validationSchema)
    const notificationHelper = useNotification()

    const { register, handleSubmit, getValues, setValue, errors, formState, reset } = useForm({
        mode: 'onBlur',
        defaultValues: { title: '', author: '', published: '', genre: '' },
        validationResolver
    })

    const { touched, isSubmitting } = formState

    const [ addBook, addBookResults ] = useMutation(ADD_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
        onError: (err) => {
            const errorsToDisplay = resolveApolloErrors(err)
            notificationHelper.addMultiple(errorsToDisplay, 'error', 5000)
        }
    })

    const addGenre = useCallback(() => {
        const { genre } = getValues()

        if(genre) {
            setGenres((prevGenres) => prevGenres.concat({ id: uid({}), value: genre }))
            setValue('genre', '')
        }
    }, [setValue, getValues])

    const removeGenre = useCallback((id) => {
        setGenres((prevGenres) => prevGenres.filter((g) => g.id !== id))
    }, [])

    const handleGenreKeyPress = useCallback(
        (event) => {
            if (event.charCode === 13) {
                event.preventDefault()
                addGenre()
            }
        },
        [addGenre]
    )


    const submit = useCallback(
        async (values) => {
            const { title, author, published } = values
            const genreValues = genres.map((g) => g.value)

            const gqlData = await addBook({
                variables: { title, author, published: parseInt(published), genres: genreValues }
            })

            if (gqlData) {
                notificationHelper.add('Successfully add book', 'success')
            }

            setGenres([])
            reset()
        },
        [genres, addBook, reset, notificationHelper]

    )

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

    return (
      <>
        <Helmet>
          <title>GraphQL Library | New Book</title>
        </Helmet>

        <Container>
          <Form onSubmit={handleSubmit(submit)} className="my-4">
            <h1 className="d-inline h2 mb-3 mr-2">Add a new Book</h1>
            {addBookResults.loading && (
              <Spinner variant="success" animation="grow" role="status" size="sm">
                <span className="sr-only">Creating Book...</span>
              </Spinner>
            )}
            <hr />

            <Form.Group as={Form.Row} controlId={seed("title")}>
              <Form.Label column sm={2} md={1} className="font-weight-bold">
                Title
              </Form.Label>
              <Col sm={10} md={6}>
                <Form.Control
                  ref={register}
                  type="text"
                  name="title"
                  placeholder="Book Title"
                  isValid={touched.title && !errors.title}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title && errors.title.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Form.Row} controlId={seed("author")}>
              <Form.Label column sm={2} md={1} className="font-weight-bold">
                Author
              </Form.Label>
              <Col sm={10} md={6}>
                <Form.Control
                  ref={register}
                  type="text"
                  name="author"
                  placeholder="Book Author"
                  isValid={touched.author && !errors.author}
                  isInvalid={!!errors.author}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.author && errors.author.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Form.Row} controlId={seed("published")}>
              <Form.Label column sm={2} md={1} className="font-weight-bold">
                Published
              </Form.Label>
              <Col sm={10} md={6}>
                <Form.Control
                  ref={register}
                  type="number"
                  name="published"
                  placeholder="Publication Year"
                  isValid={touched.published && !errors.published}
                  isInvalid={!!errors.published}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.published && errors.published.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Form.Row} controlId={seed("genre")}>
              <Form.Label column sm={2} md={1} className="font-weight-bold">
                Genres
              </Form.Label>
              <Col sm={10} md={6}>
                <InputGroup>
                  <Form.Control
                    ref={register}
                    onKeyPress={handleGenreKeyPress}
                    type="text"
                    name="genre"
                    placeholder="Book Genre"
                    aria-label="Add a Genre for the Book"
                    aria-describedby={seed("genre")}
                  />

                  <InputGroup.Append>
                    <Button type="button" variant="primary" onClick={addGenre}>
                      Add
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Text className="text-muted">
                  Enter a genre and click the button to add to the list of genres
                </Form.Text>

                <div>
                  {genres.map((genre, index) => (
                    <div
                      key={genre.id}
                      className="d-inline-block border px-3 py-2 mr-2 mb-2"
                    >
                      <button
                        type="button"
                        className="close ml-3"
                        aria-label="Remove Genre"
                        onClick={() => removeGenre(genre.id)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <span>{genre.value}</span>
                    </div>
                  ))}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ offset: 2 }} md={{ offset: 1, span: 6 }}>
                <Button
                  variant="success"
                  type="submit"
                  size="lg"
                  block
                  disabled={isSubmitting}
                >
                  Create Book
                </Button>
              </Col>
            </Form.Group>
          </Form>
      </Container>
      </>
    )
}

export default BookForm