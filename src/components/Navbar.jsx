import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoKemenkes from '../assets/logo-kemenkes.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jadwal', label: 'Jadwal' },
    { path: '/materi', label: 'Materi' },
    { path: '/penugasan', label: 'Penugasan' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/fasilitator-review', label: 'Review Fasilitator' },
  ];

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logoKemenkes} alt="Logo Kemenkes" style={{ height: '40px', width: 'auto' }} />
          <span className="logo-text">Koding Sardjito</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  style={link.path === '/fasilitator-review' ? { color: '#f59e0b', fontWeight: 'bold' } : {}}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
