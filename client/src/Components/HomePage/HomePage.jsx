import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/auth/Login")
    }

    return (
        <div>
            <h2> welcome to Home Page</h2>
            <button onClick={handleLogin}> we need to Login</button>
        </div>
    )
}

export default HomePage