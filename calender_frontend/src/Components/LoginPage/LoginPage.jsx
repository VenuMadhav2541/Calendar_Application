import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission (default action)
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
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
    }
  };
  

  // Navigate to the RegisterPage
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      
      // Check what response you get
      console.log(response.data);
  
      if (response.data.token) {
        // If the response contains a token, you can handle login
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred');
    }
  };
  

  return (
    <div className="main">
      <form className="form_Position">
        <div>
          <div className="main_head">
            <h2>Login</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row">

          <button className="btn-grad" onClick={handleLogin}>
            Login
          </button>
          <button
            type="button"
            className="btn-grad"
            onClick={handleRegister}
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
