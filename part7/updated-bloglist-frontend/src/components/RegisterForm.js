import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { createUser } from '../store/actions/userActions'


const RegisterForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const name = useField('text')
  const password = useField('password')

  const register = event => {
    event.preventDefault()

    const newUser = {
      username: username.value,
      name: name.value,
      password: password.value
    }

    dispatch(createUser(newUser))
    history.push('/login')
  }


  return (
    <div id="registerForm-container">
      <h2>Sign-up</h2>
      <form onSubmit={register}>
        <div>
            Name: <input {...name} reset="" placeholder="Enter name" />
        </div>
        <div>
            Username: <input {...username} reset="" placeholder="Enter username" />
        </div>
        <div>
            Password: <input {...password} reset="" placeholder="Enter password" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )

}

export default RegisterForm