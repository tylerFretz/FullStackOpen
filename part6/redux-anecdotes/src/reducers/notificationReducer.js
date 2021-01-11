const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}


export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message: message
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: {
                    message: ''
                }
            })
        }, seconds * 1000)
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
