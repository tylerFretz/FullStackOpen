import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../store/actions/notificationActions'
import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const clear = () => {
    dispatch(clearNotification())
  }


  if (notification) {
    return (
      <Alert variant={notification.isError ? 'danger' : 'success'} onClose={clear} dismissible>
        <Alert.Heading>{notification.isError ? 'Error' : 'Success'}</Alert.Heading>
        <p>{notification.message}</p>
      </Alert>
    )
  }

  return null
}

export default Notification