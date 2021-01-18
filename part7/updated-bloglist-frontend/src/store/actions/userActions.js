import userService from '../../services/userService'
import { setSuccess, setError } from './notificationActions'


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'users/initUsers',
      payload: users
    })
  }
}

export const createUser = userObject => {
  return async dispatch => {
    try {
      const newUser = await userService.create(userObject)
      dispatch({
        type: 'users/newUser',
        payload: newUser
      })
      dispatch(setSuccess(`${newUser.username} registered!`, 5))
    }
    catch (err) {
      dispatch(setError(err.response.data.error, 5))
    }
  }
}