const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'notification/setNotification':
        return action.payload
      case 'notification/clearNotification':
        return null
      default:
        return state
  }
}

export default notificationReducer