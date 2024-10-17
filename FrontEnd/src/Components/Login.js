import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../CSS/Login.css';
import { Link, Navigate, redirect, useNavigate  } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('username', username);
            const res = await axios.post('https://mesharch.studio/user/login', {
                username,
                password,
            });
            login(res.data.token);
            navigate('/'); // Redirect to home page


        } catch (error) {
            setError('Login failed');
            console.error('Login failed');
        }
    };

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit} className="login-form">
            <img src = "/logo512.png" alt="logo" className="form-logo"/>

                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="login-input"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <Link to="/register" className="register-link">Don't have an account? Register here</Link>
            </form>
        </div>
    );
};

export default Login;
