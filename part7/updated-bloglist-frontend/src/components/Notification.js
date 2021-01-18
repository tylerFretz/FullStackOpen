import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../store/actions/notificationActions'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const clear = event => {
    event.preventDefault()
    dispatch(clearNotification())
  }

  const errorStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'red'
  }

  const successStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'green'
  }

  if (notification) {
    return (
      <div style={notification.isError ? errorStyle : successStyle}>
        <button type="button" onClick={clear}>X</button>
        {notification.message}
      </div>
    )
  }

  return null
}

export default Notification