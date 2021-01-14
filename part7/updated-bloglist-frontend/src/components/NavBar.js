import React, { useContext } from 'react'
import UserContext from '../UserContext'
import Notification from './Notification'

const NavBar = ({ handleLogout, message, onClose }) => {
  const user = useContext(UserContext)

  const navStyle = {
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'flex-start'
  }

  const navItemStyle = {
    color: 'black',
    padding: 10,
    textDecoration: 'none'
  }
  return (
    <>
      <div className="topnav" style={navStyle}>
        <div style={navItemStyle}>Blog App</div>

        {user && (
          <>
            <div style={navItemStyle}>{user.name} logged in</div>
            <div style={navItemStyle}>
              <button type="button" onClick={handleLogout} data-cy="logout-button">Logout</button>
            </div>
          </>
        )}

        <div style ={navItemStyle}>
          <Notification message={message} onClose={onClose} />
        </div>
      </div>
    </>
  )
}

export default NavBar