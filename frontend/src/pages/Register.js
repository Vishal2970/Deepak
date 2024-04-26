import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', {
                email,
                password,
            });
            alert("Registration successful")
            navigate("/");
            // Redirect to login page or other logic
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div>
            {/* console.log("hit register page"); */}
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Register;
