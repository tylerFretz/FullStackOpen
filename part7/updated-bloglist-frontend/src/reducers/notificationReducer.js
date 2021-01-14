const initialState = {
  message: '',
  id: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      case 'CLEAR_NOTIFICATION':
        return { message: '', id: null }
      default:
        return state
  }
}


export const setNotification = (message, seconds, timerId) => {
  return async dispatch => {
    clearTimeout(timerId)

    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        id: timeoutID
      }
    })
  }
}

export default notificationReducer