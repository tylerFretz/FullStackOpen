import React, { useState, useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { useUIDSeed } from 'react-uid'
import useNotification from '../hooks/useNotification'
import { LOGIN, GET_AUTH_USER } from '../queries/userQueries'


const LoginForm = () => {
    const [redirectPath, setRedirectPath] = useState('/')
    const { state } = useLocation()
    const history = useHistory()
    const notificationHelper = useNotification()

    // set redirect to the url the user came from
    useEffect(() => {
        if (state && state.from && state.from === '/login') {
            setRedirectPath('/')
        }
        else if (state && state.from) {
            setRedirectPath(state.from)
        }
    }, [state])

    const [ login ] = useMutation(LOGIN, {
        refetchQueries: ({ data: { login } }) => {
            const token = login.value
            localStorage.setItem('fso20-gqlLibrary-user-token', token)
            return [{ query: GET_AUTH_USER }]
        },
        onError: (err) => {
            notificationHelper.add(err.graphQLErrors[0].message, 'error', 5000)
        },
        awaitRefetchQueries: true
    })

    const seed = useUIDSeed()
    const { register, handleSubmit, errors, reset, formState } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const { isSubmitting } = formState

    const loginUser = useCallback(
        async (values) => {
            const variables = {
                username: values.username,
                password: values.password
            }

            const gqlData = await login({ variables })
            reset()
            if (gqlData) {
                history.push(redirectPath)
                notificationHelper.add('Logged in', 'success')
            }
        },
        [login, notificationHelper, reset, redirectPath, history]
    )

    return (
        <>
            <Helmet>
                <title>GraphQL Library | Login</title>
            </Helmet>
            
            <Form onSubmit={handleSubmit(loginUser)}>
                <Form.Group controlId={seed('username')}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text'
                        ref={register({ required: 'Please enter username' })}
                        name='username'
                        placeholder='Enter Username'
                        isInvalid={!!errors.username}
                    />

                    <Form.Control.Feedback type='invalid'>
                        {errors.username && errors.username.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId={seed('password')}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        ref={register({ required: 'Please enter password' })}
                        name='password'
                        placeholder='Enter password'
                        isInvalid={!!errors.password}
                    />

                    <Form.Control.Feedback type='invalid'>
                        {errors.password && errors.password.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Button type='submit' size='lg' disabled={isSubmitting} block>
                        <>
                            {!isSubmitting && <span className='text-uppercase'>Login</span>}
                            {isSubmitting && (
                                <Spinner animation='border' role='status'>
                                    <span className='sr-only'>Logging in...</span>
                                </Spinner>
                            )}
                        </>
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default LoginForm
