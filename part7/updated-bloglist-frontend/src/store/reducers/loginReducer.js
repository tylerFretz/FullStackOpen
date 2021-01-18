const intitialState = {
  token: '',
  username: '',
  name: ''
}

const loginReducer = (state = intitialState, action) => {
  switch(action.type) {
      case 'login/loggedIn':
        return action.payload
      case 'login/loggedOut':
        return intitialState
      default:
        return state
  }
}

export default loginReducer