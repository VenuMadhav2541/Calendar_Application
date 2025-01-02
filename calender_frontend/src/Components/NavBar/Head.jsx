import React from 'react';
import './head.css';
import logo from './logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Head = () => {
  const navigate = useNavigate();

  // Handle Logout functionality
  const handleLogout = () => {
    // Clear local storage (where your token is stored)
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/');

    // Optional: Disable back button functionality after logout
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  };

  return (
    <div className='row1 main_nav'>
      <NavLink to={'/about'} className='item'>
        <div className='row1'>
          <div className='image'>
            <img className='img12' src={logo} alt='logo' />
          </div>
          <div className='logo_head'>
            <h1>
              Calendar <span style={{ color: 'rgb(110, 77, 255)' }}> Application</span>
            </h1>
          </div>
        </div>
      </NavLink>
      <div className='row1 left_align'>
        <NavLink to={'/user'} className='item'>
          <div className='list different'>Dashbord</div>
        </NavLink>

        <NavLink to={'/about'} className='item'>
          <div className='different'>About</div>
        </NavLink>

        <NavLink to={'/calendar'} className='item'>
          <div className='different'>Calendar</div>
        </NavLink>

        
        <button onClick={handleLogout} className='item item1'>
          <div className='list different'>Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Head;
