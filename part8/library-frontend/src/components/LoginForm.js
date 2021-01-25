import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, GET_AUTH_USER } from '../queries/userQueries'


const LoginForm = (props) => {
    const [username, setUsername] = useState('')

    const [ login ] = useMutation(LOGIN, {
        refetchQueries: ({ data: { login } }) => {
            const token = login.value
            localStorage.setItem('fso20-gqlLibrary-user-token', token)
            return [{ query: GET_AUTH_USER }]
        }
    })
}