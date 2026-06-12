import React from 'react';
import { FaHourglassHalf, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MenungguPersetujuan = () => {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 5rem)', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
      <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem 2rem' }}>
        <FaHourglassHalf style={{ fontSize: '4rem', color: '#f59e0b', margin: '0 auto 1.5rem' }} />
        <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>Menunggu Persetujuan Admin</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
          Halo <strong>{userData ? userData.namaLengkap : 'Peserta'}</strong>,<br/>
          Akun Anda telah berhasil didaftarkan, namun saat ini sedang menunggu persetujuan (*approval*) dari Administrator atau Fasilitator sebelum Anda dapat mengakses materi dan ujian.
        </p>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Silakan hubungi Panitia atau coba *refresh* halaman ini beberapa saat lagi jika Admin sudah menyetujui akun Anda.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Refresh Status
          </button>
          <button className="btn btn-outline" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaSignOutAlt /> Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenungguPersetujuan;
