import React, { useState } from 'react';
import axios from 'axios';
// import './register.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user' role

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role
      });

      alert(response.data.message); // Display success message

      // Optionally, redirect to login page after successful registration
      // navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="main">
      <form className="form_Position" onSubmit={handleRegister}>
        <div>
          <div className="main_head">
            <h2>Register</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn-grad" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
