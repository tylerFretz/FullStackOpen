const initialState = {
    message: 'Add some anecdotes'
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}


export const setNotification = (message) => {
  return {
      type: 'SET_NOTIFICATION',
      data: {
        message: message
      }
  }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        data: {
            message: ''
        }
    }
}

export default notificationReducer
