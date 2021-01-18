import React from 'react'
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
      <h2>LogIn</h2>
      <form onSubmit={handleLogin}>
        <div>
              Username: <input data-cy="username" {...username} reset="" placeholder="Enter username" />
        </div>
        <div>
              Password: <input data-cy="password" {...password} reset="" placeholder="Enter password" />
        </div>
        <div>
          <button type="submit" data-cy="login-button">Login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm