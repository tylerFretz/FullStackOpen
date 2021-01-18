import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/loginActions'

const NavBar = () => {
  const dispatch = useDispatch()

  const navStyle = {
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'space-evenly'
  }

  const navItemStyle = {
    color: 'black',
    padding: 10,
    textDecoration: 'none'
  }

  const user = useSelector(state => state.loggedInUser)

  const handleLogout = event => {
    event.preventDefault()

    dispatch(logout())
  }

  return (
    <>
      <div className="topnav" style={navStyle}>
        <div style={navItemStyle}>Blog App</div>

        <ul>
          <Link style={navItemStyle} to='/'>Home</Link>
          <Link style={navItemStyle} to='/users'>Users</Link>
          <Link style={navItemStyle} to='/register'>Sign-up</Link>
          {user.token && (
            <Link style={navItemStyle} to='/createBlog'>Add new Blog</Link>
          )}
          {!user.token && (
            <Link style={navItemStyle} to='/login'>Login</Link>
          )}
        </ul>
        {user.token && (
          <>
            <div style={navItemStyle}>{user.username} logged in</div>
            <div style={navItemStyle}>
              <button type="button" onClick={handleLogout} data-cy="logout-button">Logout</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default NavBar