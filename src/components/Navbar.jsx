import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import logoKemenkes from '../assets/logo-kemenkes.png';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isFasilDropdownOpen, setIsFasilDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeDropdowns = () => {
    setIsOpen(false);
    setIsAdminDropdownOpen(false);
    setIsFasilDropdownOpen(false);
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

  const fasilLinks = [
    { path: '/fasilitator-review', label: 'Review Fasilitator' },
    { path: '/panduan-fasilitator', label: 'Panduan & Jawaban' }
  ];

  const adminLinks = [
    { path: '/admin-dashboard', label: 'Admin Dashboard' },
    { path: '/manajemen-user', label: 'Manajemen User' },
    { path: '/fasilitator-review', label: 'Review Fasilitator' },
    { path: '/panduan-fasilitator', label: 'Panduan & Jawaban' }
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

            {/* Fasilitator Dropdown */}
            {userData && userData.role === 'fasilitator' && (
              <li 
                className={`nav-item dropdown ${isFasilDropdownOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsFasilDropdownOpen(true)}
                onMouseLeave={() => setIsFasilDropdownOpen(false)}
              >
                <div 
                  className="dropdown-toggle" 
                  onClick={() => setIsFasilDropdownOpen(!isFasilDropdownOpen)}
                >
                  Fasilitator Panel <span style={{ fontSize: '0.8em' }}>▼</span>
                </div>
                <div className="dropdown-menu">
                  {fasilLinks.map((fasilLink) => (
                    <Link
                      key={fasilLink.path}
                      to={fasilLink.path}
                      className={`dropdown-item ${location.pathname === fasilLink.path ? 'active' : ''}`}
                      onClick={closeDropdowns}
                    >
                      {fasilLink.label}
                    </Link>
                  ))}
                </div>
              </li>
            )}

            {/* Admin Dropdown */}
            {userData && userData.role === 'admin' && (
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
              <li className="nav-item user-profile-item">
                <span className="user-profile-name">
                  <FaUserCircle size={18} /> {userData ? userData.namaLengkap : 'Loading...'}
                </span>
                <button onClick={handleLogout} className="btn btn-outline btn-logout">
                  <FaSignOutAlt /> Keluar
                </button>
              </li>
            ) : (
              <li className="nav-item login-item">
                <Link to="/login" className="btn btn-primary" onClick={() => setIsOpen(false)}>
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
