import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const timerId = useSelector(state => state.notification.id)
  const dispatch = useDispatch()

  const clear = event => {
    event.preventDefault()
    dispatch(setNotification('', 0, timerId))
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'pink'
  }

  if (notification) {
    return (
      <div style={style}>
        <button type="button" onClick={clear}>X</button>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification