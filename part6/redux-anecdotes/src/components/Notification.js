import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  const clear = event => {
    event.preventDefault()
    dispatch(clearNotification())
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