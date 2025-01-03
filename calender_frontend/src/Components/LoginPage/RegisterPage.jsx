import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [role, setRole] = useState('user'); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
      const response = await axios.post('https://calendar-application-7sna.onrender.com/api/auth/register', {
        username,
        password,
        role,
        Name,
        Email
      });

      alert('Registration Successfully'); 

      navigate('/login');
    } catch (error) {
      alert('Registration failed');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    navigate('/');
  };

  return (
    <div className="main">
      {loading && <Loading />} 
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
          <input
              type="text"
              placeholder="Name"
              value={Name}
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
          <input
              type="text"
              placeholder="Email"
              value={Email}
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
      </form>
    </div>
  );
};

export default RegisterPage;
