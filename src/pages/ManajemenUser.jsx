import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUsers, FaSync, FaCheckCircle, FaTimesCircle, FaUserShield, FaUser, FaTrash } from 'react-icons/fa';

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleApproval = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isApproved: !currentStatus
      });
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, isApproved: !currentStatus } : u));
    } catch (err) {
      console.error("Error updating approval status:", err);
      alert("Gagal mengubah status persetujuan.");
    }
  };

  const toggleRole = async (userId, currentAdminStatus) => {
    if (!window.confirm(`Apakah Anda yakin ingin ${currentAdminStatus ? 'mencabut' : 'memberikan'} akses Admin pada pengguna ini?`)) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: !currentAdminStatus
      });
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !currentAdminStatus } : u));
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Gagal mengubah role pengguna.");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("PERINGATAN: Apakah Anda yakin ingin menghapus data pengguna ini secara permanen dari sistem? Mereka tidak akan bisa login atau mengakses materi lagi.")) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      // Remove from local state
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Gagal menghapus pengguna.");
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem 1rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <FaUsers /> Manajemen User
            </h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>Kelola persetujuan pendaftaran dan hak akses peran pengguna.</p>
          </div>
          <button onClick={fetchUsers} disabled={loading} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaSync className={loading ? "spin" : ""} /> {loading ? "Memuat..." : "Muat Ulang Data"}
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '1rem', color: '#334155' }}>Nama Lengkap</th>
                <th style={{ padding: '1rem', color: '#334155' }}>Username</th>
                <th style={{ padding: '1rem', color: '#334155' }}>Instansi / Kelompok</th>
                <th style={{ padding: '1rem', color: '#334155', textAlign: 'center' }}>Role</th>
                <th style={{ padding: '1rem', color: '#334155', textAlign: 'center' }}>Status Approval</th>
                <th style={{ padding: '1rem', color: '#334155', textAlign: 'center' }}>Aksi Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Belum ada data pengguna.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{user.namaLengkap}</td>
                    <td style={{ padding: '1rem', color: '#475569' }}>@{user.username}</td>
                    <td style={{ padding: '1rem', color: '#475569' }}>
                      <div style={{ fontSize: '0.9rem' }}>{user.instansi || '-'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{user.kelompok} (Angk. {user.angkatan})</div>
                    </td>
                    
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {user.isAdmin ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
                          <FaUserShield /> Admin
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
                          <FaUser /> Peserta
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => toggleApproval(user.id, user.isApproved)}
                        style={{
                          backgroundColor: user.isApproved ? '#dcfce7' : '#fee2e2',
                          color: user.isApproved ? '#166534' : '#991b1b',
                          border: `1px solid ${user.isApproved ? '#bbf7d0' : '#fecaca'}`,
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {user.isApproved ? <><FaCheckCircle /> Disetujui</> : <><FaTimesCircle /> Tunda</>}
                      </button>
                    </td>

                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button 
                          onClick={() => toggleRole(user.id, user.isAdmin)}
                          className={`btn ${user.isAdmin ? 'btn-outline' : 'btn-primary'}`}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          {user.isAdmin ? 'Jadikan Peserta' : 'Jadikan Admin'}
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer' }}
                          title="Hapus Pengguna"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManajemenUser;
