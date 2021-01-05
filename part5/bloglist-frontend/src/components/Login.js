import React from 'react'

const Login = ({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    handleLogin
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                Username: <input type="text" value={username} onChange={onUsernameChange} />
            </div>
            <div>
                Password: <input type="password" value={password} onChange={onPasswordChange} />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login