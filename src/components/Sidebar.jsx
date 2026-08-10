import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaCalendarAlt, FaBookOpen, FaTasks, FaFileAlt, 
  FaTrophy, FaUserShield, FaUserCog, FaSignOutAlt, 
  FaChevronLeft, FaChevronRight, FaTimes, FaChalkboardTeacher,
  FaFileSignature, FaUserCircle, FaBuilding, FaLayerGroup, FaCheckCircle
} from 'react-icons/fa';
import logoKemenkes from '../assets/logo-kemenkes.png';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard Utama', icon: <FaHome />, public: true },
    { path: '/jadwal', label: 'Jadwal Pelatihan', icon: <FaCalendarAlt />, public: true },
    { path: '/materi', label: 'Modul Materi', icon: <FaBookOpen /> },
    { path: '/penugasan', label: 'Workspace Penugasan', icon: <FaTasks /> },
    { path: '/rtl-form', label: 'Formulir RTL', icon: <FaFileSignature /> },
    { path: '/leaderboard', label: 'Papan Peringkat', icon: <FaTrophy /> },
  ];

  const fasilItems = [
    { path: '/fasilitator-review', label: 'Review Fasilitator', icon: <FaChalkboardTeacher /> },
    { path: '/panduan-fasilitator', label: 'Panduan & Kunci', icon: <FaFileAlt /> },
  ];

  const adminItems = [
    { path: '/admin-dashboard', label: 'Admin Analytics', icon: <FaUserCog /> },
    { path: '/manajemen-user', label: 'Manajemen User', icon: <FaUserShield /> },
    { path: '/fasilitator-review', label: 'Review Fasilitator', icon: <FaChalkboardTeacher /> },
    { path: '/panduan-fasilitator', label: 'Panduan & Kunci', icon: <FaFileAlt /> },
  ];

  const renderNavLink = (item) => {
    const isActive = location.pathname === item.path;
    return (
      <li key={item.path} className="sidebar-nav-item">
        <Link 
          to={item.path} 
          className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
          onClick={closeMobile}
          title={isCollapsed ? item.label : ''}
        >
          <span className="sidebar-icon">{item.icon}</span>
          {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
          {isActive && <span className="sidebar-active-indicator" />}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div className="sidebar-mobile-backdrop" onClick={closeMobile} />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" onClick={closeMobile}>
            <img src={logoKemenkes} alt="Kemenkes RI" className="brand-logo" />
            {!isCollapsed && (
              <div className="brand-text-container">
                <span className="brand-title">LMS KODING</span>
                <span className="brand-subtitle">FPKTL KEMENKES RI</span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button 
            className="sidebar-collapse-btn" 
            onClick={toggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* Mobile Close Button */}
          <button className="sidebar-mobile-close-btn" onClick={closeMobile}>
            <FaTimes />
          </button>
        </div>

        {/* User Card Section (if logged in) */}
        {currentUser && userData && (
          <div className="sidebar-user-card">
            <div className="user-avatar-wrapper">
              <div className="user-avatar">
                {userData.namaLengkap ? userData.namaLengkap.charAt(0).toUpperCase() : <FaUserCircle />}
              </div>
              <span className="user-status-dot" title="Status Online" />
            </div>
            {!isCollapsed && (
              <div className="user-info">
                <div className="user-name" title={userData.namaLengkap}>{userData.namaLengkap || userData.username}</div>
                <div className="user-meta">
                  <span className="role-tag">
                    {userData.role === 'admin' ? 'Admin Utama' : userData.role === 'fasilitator' ? 'Fasilitator' : 'Peserta'}
                  </span>
                  {userData.kelompok && <span className="group-tag">Kel. {userData.kelompok}</span>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sidebar Navigation Body */}
        <div className="sidebar-body">
          
          {/* Main Navigation Group */}
          <div className="sidebar-nav-group">
            {!isCollapsed && <div className="group-header">MENU UTAMA</div>}
            <ul className="sidebar-nav-list">
              {navItems.map(item => {
                if (!item.public && !currentUser) return null;
                return renderNavLink(item);
              })}
            </ul>
          </div>

          {/* Fasilitator Panel */}
          {userData && userData.role === 'fasilitator' && (
            <div className="sidebar-nav-group">
              {!isCollapsed && <div className="group-header">PANEL FASILITATOR</div>}
              <ul className="sidebar-nav-list">
                {fasilItems.map(renderNavLink)}
              </ul>
            </div>
          )}

          {/* Admin Panel */}
          {userData && userData.role === 'admin' && (
            <div className="sidebar-nav-group">
              {!isCollapsed && <div className="group-header">PANEL ADMIN</div>}
              <ul className="sidebar-nav-list">
                {adminItems.map(renderNavLink)}
              </ul>
            </div>
          )}

        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {currentUser ? (
            <button className="sidebar-logout-btn" onClick={handleLogout} title={isCollapsed ? "Keluar Akun" : ""}>
              <FaSignOutAlt className="logout-icon" />
              {!isCollapsed && <span>Keluar Akun</span>}
            </button>
          ) : (
            <Link to="/login" className="sidebar-login-btn" onClick={closeMobile}>
              <FaUserCircle />
              {!isCollapsed && <span>Login Portal</span>}
            </Link>
          )}

          {!isCollapsed && (
            <div className="sidebar-version-badge">
              v2.4 Enterprise LMS
            </div>
          )}
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
