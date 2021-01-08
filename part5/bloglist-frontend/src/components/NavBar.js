import React, { useContext } from 'react'
import UserContext from '../UserContext'

const NavBar = ({ handleLogout }) => {
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
        <div style={navItemStyle}>{user.name} logged in</div>
        <div style={navItemStyle}>
          <button type="button" onClick={handleLogout} data-cy="logout-button">Logout</button>
        </div>
      </div>
    </>
  )
}

export default NavBar