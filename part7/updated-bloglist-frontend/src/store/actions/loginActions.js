import loginService from '../../services/loginService'
import blogService from '../../services/blogService'
import { setSuccess, setError } from './notificationActions'


export const login = credentials => {
  return async dispatch => {
    try {
      const loggedInUser = await loginService.login(credentials)

      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      dispatch({
        type: 'login/loggedIn',
        payload: loggedInUser
      })

      console.log(window.localStorage.getItem('loggedInUser'))
    }
    catch (err) {
      dispatch(setError(err.response.data.error, 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: 'login/loggedOut'
    })
    dispatch(setSuccess('Logged out.', 5))
  }
}

export const setUser = () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser)
    blogService.setToken(user.token)
    return {
      type: 'login/loggedIn',
      payload: user
    }
  }

  return { type: 'login/loggedOut' }
}