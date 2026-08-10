import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaBell, FaUserCircle, FaCalendarDay, FaBuilding, FaChevronRight, FaDesktop } from 'react-icons/fa';
import logoKemenkes from '../assets/logo-kemenkes.png';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ isCollapsed, toggleMobileMenu }) => {
  const location = useLocation();
  const { currentUser, userData } = useAuth();

  // Page Title Resolver
  const getPageTitle = (path) => {
    switch (path) {
      case '/': return { title: 'Dashboard Utama', category: 'Portal Pembelajaran' };
      case '/jadwal': return { title: 'Jadwal Pelatihan', category: 'Informasi Workshop' };
      case '/materi': return { title: 'Modul Materi Pelatihan', category: 'Bahan Ajar & Referensi' };
      case '/penugasan': return { title: 'Workspace Penugasan & Kuis', category: 'Studi Kasus Koder' };
      case '/quiz-mpi1': return { title: 'MPI 1: Analisis Rekam Medis', category: 'Penugasan Koder' };
      case '/quiz-mpi2': return { title: 'MPI 2: Kodifikasi ICD-10', category: 'Penugasan Koder' };
      case '/quiz-mpi3': return { title: 'MPI 3: Kodifikasi ICD-9-CM', category: 'Penugasan Koder' };
      case '/quiz-mpi4': return { title: 'MPI 4: Ungroupable iDRG', category: 'Penugasan Koder' };
      case '/penugasan-mpi5': return { title: 'MPI 5: Looker Studio Klaim', category: 'Penugasan Koder' };
      case '/rtl-form': return { title: 'Formulir Rencana Tindak Lanjut (RTL)', category: 'Pasca Pelatihan' };
      case '/leaderboard': return { title: 'Papan Peringkat Real-time', category: 'Skor & Peringkat' };
      case '/admin-dashboard': return { title: 'Admin Analytics Dashboard', category: 'Panel Administrator' };
      case '/manajemen-user': return { title: 'Manajemen Akun User', category: 'Panel Administrator' };
      case '/fasilitator-review': return { title: 'Review & Evaluasi Peserta', category: 'Panel Fasilitator' };
      case '/panduan-fasilitator': return { title: 'Panduan & Kunci Jawaban', category: 'Panel Fasilitator' };
      default: return { title: 'LMS Pelatihan Koding', category: 'Kemenkes RI' };
    }
  };

  const currentPage = getPageTitle(location.pathname);
  const formattedDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className={`app-header ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="header-container">
        
        {/* Left Section: Mobile Toggle & Breadcrumb Title */}
        <div className="header-left">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            <FaBars />
          </button>

          <div className="breadcrumb-wrapper">
            <span className="breadcrumb-category">{currentPage.category}</span>
            <FaChevronRight className="breadcrumb-sep" />
            <h1 className="breadcrumb-title">{currentPage.title}</h1>
          </div>
        </div>

        {/* Right Section: Enterprise Info & User Widget */}
        <div className="header-right">
          
          <div className="date-widget">
            <FaCalendarDay className="date-icon" />
            <span>{formattedDate}</span>
          </div>

          <div className="header-divider" />

          {currentUser && userData ? (
            <div className="user-top-widget">
              <div className="user-top-info">
                <span className="user-top-name">{userData.namaLengkap || userData.username}</span>
                <span className="user-top-instansi">{userData.instansi || 'Peserta JKN'}</span>
              </div>
              <div className="user-top-avatar">
                {userData.namaLengkap ? userData.namaLengkap.charAt(0).toUpperCase() : <FaUserCircle />}
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-header-login">
              Login Portal
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;
