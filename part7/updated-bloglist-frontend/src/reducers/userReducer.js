import userService from '../services/userService'

const userReducer = (state = [], action) => {
  switch(action.type) {
      case 'INIT_USERS':
        return action.data
      case 'NEW_USER': {
        const id = action.data.id
        return state.filter(user => user.id !== id).concat(action.data)
      }
      default:
        return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = userObject => {
  return async dispatch => {
    const newUser = await userService.create(userObject)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}

export default userReducer