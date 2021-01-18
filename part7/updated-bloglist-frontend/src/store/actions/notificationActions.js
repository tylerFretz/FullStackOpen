export const setSuccess = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'notification/setNotification',
      payload: {
        message,
        isError: false
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'notification/clearNotification'
      })
    }, seconds * 1000)
  }
}


export const setError = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'notification/setNotification',
      payload: {
        message,
        isError: true
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'notification/clearNotification'
      })
    }, seconds * 1000)
  }
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'notification/clearNotification'
    })
  }
}