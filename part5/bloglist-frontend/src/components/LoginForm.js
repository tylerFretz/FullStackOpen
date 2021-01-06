import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const login = event => {
        event.preventDefault()
        handleLogin({
            username: username,
            password: password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={login}>
            <div>
                Username: <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                Password: <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm