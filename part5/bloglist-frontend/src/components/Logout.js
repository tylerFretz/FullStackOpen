import React from 'react'

const Logout = ({
    handleLogout
}) => {
    return (
        <>
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}

export default Logout