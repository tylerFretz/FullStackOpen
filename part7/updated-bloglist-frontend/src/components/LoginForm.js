import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../store/actions/loginActions'
import { useField } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = event => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    dispatch(login(credentials))
    history.push('/')
  }

  return (
    <>
      <h2>Log-in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} reset="" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} reset="" placeholder="Enter password" />
        </Form.Group>

        <Button variant="primary" type="submit">Log in</Button>
      </Form>
    </>
  )
}

export default LoginForm