import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', {
                email,
                password,
            });
            alert(response.data.token);
            localStorage.setItem('token', response.data.token);
            alert("Logined");
            navigate("/Profile");
            // Redirect to profile page or other logic
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            {/* console.log("Hit login.js"); */}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
