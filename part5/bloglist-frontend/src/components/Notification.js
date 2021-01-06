import React from 'react'


const Notification = ({ message, onClose }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.type}>
      <span>
        <button onClick={() => onClose()}>X</button>
      </span>
      <span>
        {message.body}
      </span>
      <br/>
    </div>
  )
}

export default Notification