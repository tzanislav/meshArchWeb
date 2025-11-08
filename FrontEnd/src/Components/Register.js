import React, { useState } from 'react';
import axios from '../axios-config';
import '../CSS/Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    //Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(username)){
      setMessage('Invalid email');
      return;
    }

    

    try {
  await axios.post('/user/register', {
        username,
        password,
      });
      setMessage('User registered successfully');
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
      <img src = "/logo512.png" alt="logo" className="form-logo"/>

        <h2 className="register-title">Register</h2>
        {message && <p className="register-message">{message}</p>}

        <div className="input-group">
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="register-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="register-input"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <Link to="/login" className="login-link">Already have an account? Login here</Link>
      </form>
    </div>
  );
};

export default Register;
