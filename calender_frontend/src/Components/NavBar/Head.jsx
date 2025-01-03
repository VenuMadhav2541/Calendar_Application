import React, { useState } from 'react';
import './head.css';
import logo from './logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Head = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='row1 main_nav'>
      <div>
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
      </div>
        <div className='row1'>
        <div className='menu-toggle' onClick={toggleMenu}>
          &#9776;
        </div>
      <div className={`row1 left_align ${isMenuOpen ? 'show-menu' : ''}`}>
        <NavLink to={'/user'} className='item'>
          <div className='different'>Dashboard</div>
        </NavLink>
        <NavLink to={'/about'} className='item'>
          <div className='different'>About</div>
        </NavLink>
        <NavLink to={'/calendar'} className='item'>
          <div className='different'>Calendar</div>
        </NavLink>
        <button onClick={handleLogout} className='item item1'>
          <div className='different'>Logout</div>
        </button>
      </div>
        </div>
    </div>
  );
};

export default Head;
