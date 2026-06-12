import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    instansi: '',
    angkatan: '',
    kelompok: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validasi username tanpa spasi
    if (/\s/.test(formData.username)) {
      setError('Username tidak boleh menggunakan spasi.');
      setLoading(false);
      return;
    }

    try {
      // Create Firebase Auth user with fake email
      const email = `${formData.username.trim().toLowerCase()}@pusbikes.com`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
      const user = userCredential.user;

      // Cek apakah admin
      const isAdmin = formData.username.toLowerCase() === 'admin' || formData.username.toLowerCase() === 'fasilitator';
      
      // Auto approve for admins, false for others
      const isApproved = isAdmin ? true : false;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        namaLengkap: formData.namaLengkap,
        instansi: formData.instansi,
        angkatan: formData.angkatan,
        kelompok: formData.kelompok,
        username: formData.username.trim().toLowerCase(),
        isAdmin: isAdmin,
        isApproved: isApproved,
        createdAt: new Date().toISOString()
      });

      // Sign out immediately so they must log in manually
      await auth.signOut();
      
      alert("Registrasi berhasil! Silakan login menggunakan Username dan Password yang telah Anda buat.");
      navigate('/login');
      
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Username sudah digunakan. Silakan gunakan username lain.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password minimal 6 karakter.');
      } else {
        setError('Terjadi kesalahan saat registrasi. Pastikan data terisi dengan benar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 5rem)', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <FaUserPlus /> Pendaftaran Peserta
        </h2>
        
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Nama Lengkap</label>
            <input 
              type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Instansi</label>
              <input 
                type="text" name="instansi" value={formData.instansi} onChange={handleChange} required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Angkatan</label>
              <input 
                type="text" name="angkatan" value={formData.angkatan} onChange={handleChange} required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Kelompok</label>
            <input 
              type="text" name="kelompok" value={formData.kelompok} onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />

          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Username</label>
            <input 
              type="text" name="username" value={formData.username} onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              placeholder="Tanpa spasi, misal: budi123"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Password</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              placeholder="Minimal 6 karakter"
              minLength="6"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          Sudah punya akun? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
