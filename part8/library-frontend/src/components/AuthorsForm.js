import React, { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useUIDSeed } from 'react-uid'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries/authorQueries'
import useNotification from '../hooks/useNotification'
import useAuthUser from '../hooks/useAuthUser'
import { resolveApolloErrors } from '../helpers/errorHelper'


const AuthorsForm = ({ authors }) => {
    const selectOptions = authors.map((a) => ({ value: a.id, label: a.name }))
    const { user, hasSyncAuth } = useAuthUser()
    const notificationHelper = useNotification()
    const seed = useUIDSeed()

    const [editBirthYear, editBirthYearResults] = useMutation(EDIT_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (err) => {
            const errorsToDisplay = resolveApolloErrors(err)
            notificationHelper.addMultiple(errorsToDisplay, 'error', 5000) 
        }
    })

    const { handleSubmit, register, errors, control, formState, reset } = useForm(
        {
            defaultValues: {
                author: ''
            }
        }
    )

    const { isSubmitting } = formState

    const updateAuthor = useCallback(
        async (values) => {
            const variables = {
                name: values.author.label,
                setBornTo: parseInt(values.birthYear)
            }

            const gqlData = await editBirthYear({ variables })
            if (gqlData) {
                notificationHelper.add('Author edited succesfully', 'info')
            }
            reset()
        },
        [editBirthYear, notificationHelper, reset]
    )

    const resetForm = useCallback(() => {
        reset()
    }, [reset])


    if (!user || !hasSyncAuth)
        return null

    return (
        <Form onSubmit={handleSubmit(updateAuthor)} className='mb-4'>
            <div className='d-flex align-items-baseline'>
                <h2 className="h4 mb-3 mr-2">Update Author</h2>
                {editBirthYearResults.loading && (
                    <Spinner variant='info' animation='grow' role='status' size='sm'>
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                )}
            </div>

            <Form.Group as={Form.Row}>
                <Col xs={10} md={5}>
                    <Controller
                        name='author'
                        as={Select}
                        control={control}
                        rules={{ required: true }}
                        options={selectOptions}
                        aria-label={seed('author')}
                        aria-labelledby={seed('author')}
                        placeholder='Select an Author'
                    />
                    <div className='d-flex flex-column'>
                        <small id={seed('author')} className='sr-only'>
                            Select an author to update from the dropdown.
                        </small>
                        <small className='text-danger mt-1'>
                            {errors.author && 'Please select an author'}
                        </small>
                    </div>
                </Col>
            </Form.Group>

            <Form.Group as={Form.Row} controlId={seed('birthYear')}>
                <Col xs={8} md={4}>
                    <Form.Control
                        type='number'
                        ref={register({ required: 'birth year is required.' })}
                        name='birthYear'
                        placeholder='Enter birth year'
                        isInvalid={!!errors.birthYear}
                    />

                    <Form.Control.Feedback type='invalid'>
                        {errors.birthYear && errors.birthYear.message}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col>
                    <Button type='submit' disabled={isSubmitting} className='mr-3'>
                        Update
                    </Button>
                    <Button
                        variant='secondary'
                        type='button'
                        disabled={isSubmitting}
                        className='mr-3'
                        onClick={resetForm}
                    >
                        Clear
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default AuthorsForm