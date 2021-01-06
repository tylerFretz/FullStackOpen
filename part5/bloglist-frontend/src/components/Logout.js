import React from 'react'

const Logout = ({ user, handleLogout }) => {
  return (
    <>
      {user.name} logged in
      <button onClick={handleLogout}>Log Out</button>
    </>
  )
}

export default Logout