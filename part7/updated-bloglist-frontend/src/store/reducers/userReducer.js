const userReducer = (state = [], action) => {
  switch(action.type) {
      case 'users/initUsers':
        return action.payload
      case 'users/newUser':
        return [...state, action.payload]
      default:
        return state
  }
}

export default userReducer