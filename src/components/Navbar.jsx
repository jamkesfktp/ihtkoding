import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import logoKemenkes from '../assets/logo-kemenkes.png';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeDropdowns = () => {
    setIsOpen(false);
    setIsAdminDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', public: true },
    { path: '/jadwal', label: 'Jadwal', public: true },
    { path: '/materi', label: 'Materi' },
    { path: '/penugasan', label: 'Penugasan' },
    { path: '/leaderboard', label: 'Leaderboard' }
  ];

  const adminLinks = [
    { path: '/admin-dashboard', label: 'Admin Dashboard' },
    { path: '/fasilitator-review', label: 'Review Fasilitator' },
    { path: '/manajemen-user', label: 'Manajemen User' },
  ];

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logoKemenkes} alt="Logo Kemenkes" style={{ height: '40px', width: 'auto' }} />
          <span className="logo-text">IHT Pelatihan Koding</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => {
              // Hide protected routes if not logged in
              if (!link.public && !currentUser) return null;
              // Hide admin routes if not admin
              if (link.adminOnly && (!userData || !userData.isAdmin)) return null;

              return (
                <li key={link.path} className="nav-item">
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={closeDropdowns}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* Admin Dropdown */}
            {userData && userData.isAdmin && (
              <li 
                className={`nav-item dropdown ${isAdminDropdownOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsAdminDropdownOpen(true)}
                onMouseLeave={() => setIsAdminDropdownOpen(false)}
              >
                <div 
                  className="dropdown-toggle" 
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                >
                  Admin Panel <span style={{ fontSize: '0.8em' }}>▼</span>
                </div>
                <div className="dropdown-menu">
                  {adminLinks.map((adminLink) => (
                    <Link
                      key={adminLink.path}
                      to={adminLink.path}
                      className={`dropdown-item ${location.pathname === adminLink.path ? 'active' : ''}`}
                      onClick={closeDropdowns}
                    >
                      {adminLink.label}
                    </Link>
                  ))}
                </div>
              </li>
            )}
            
            {/* User Profile / Login Button */}
            {currentUser ? (
              <li className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto', paddingLeft: '1rem', borderLeft: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-primary-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem' }}>
                  <FaUserCircle size={18} /> {userData ? userData.namaLengkap : 'Loading...'}
                </span>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FaSignOutAlt /> Keluar
                </button>
              </li>
            ) : (
              <li className="nav-item" style={{ marginLeft: '1rem' }}>
                <Link to="/login" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ padding: '0.5rem 1.2rem' }}>
                  Login / Daftar
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
