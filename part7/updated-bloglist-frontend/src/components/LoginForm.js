import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const login = event => {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={login}>
      <div>
            Username: <input id="username" type="text" data-cy="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
            Password: <input id="password" type="password" data-cy="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <button id="login-button" type="submit" data-cy="login-button">Login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm