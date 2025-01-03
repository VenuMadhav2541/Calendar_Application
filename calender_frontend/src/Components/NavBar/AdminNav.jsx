import React, { useState } from 'react';
import './head.css';
import logo from './logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Head = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  };

  return (
    <div className='row1 main_nav'>
      <NavLink to={'/admin'} className='item'>
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
      <div className='row1'>
        <button className='menu-toggle' onClick={toggleMenu}>
            &#9776;
        </button>
        <div className={`row1 left_align ${isMenuOpen ? 'show-menu' : ''}`}>
          <NavLink to={'/admin'} className='item'>
            <div className='different'>About</div>
          </NavLink>

          <NavLink to={'/companyManagement'} className='item'>
            <div className='different'>Company</div>
          </NavLink>

          <NavLink to={'/communication'} className='item'>
            <div className='different'>Communication</div>
          </NavLink>

          <NavLink to={'/report'} className='item'>
            <div className='different'>Report And Analysis</div>
          </NavLink>

          <button onClick={handleLogout} className='item item1'>
            <div className='list different'>Logout</div>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Head;
