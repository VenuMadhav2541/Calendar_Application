import React, { useState } from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Loading from '../Loading';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission (default action)
    setLoading(true);
    try {
      const response = await axios.post('https://calendar-application-7sna.onrender.com/api/auth/login', {
        username,
        password,
      });
  
      const { token, role } = response.data;
  
      // Store token in localStorage
      localStorage.setItem('token', token);
  
      if (role === 'admin') {
        navigate('/admin'); // Navigate to admin dashboard
      } else if (role === 'user') {
        navigate('/about'); // Navigate to user page
      }
    } catch (error) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  

  // Navigate to the RegisterPage
  const handleRegister = async () => {
    setLoading(true);
    navigate('/register');
  };
  

  return (
    <div className="main">
      {loading && <Loading />} {/* Show loading animation during data fetching */}
      <form className="form_Position">
        <div>
          <div className="main_head">
            <h2>Login</h2>
          </div>
          <input
          className='color'
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className='color'
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row">

          <button className="btn-grad" onClick={handleLogin} disabled={loading}>
            Login
          </button>
          <button
            type="button"
            className="btn-grad"
            onClick={handleRegister}
            disabled={loading}
          >
            Register
          </button>
        </div>

        <div className="social"></div>
      </form>
    </div>
  );
};

export default LoginPage;
