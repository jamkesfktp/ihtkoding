import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Behind the scenes, we use @pusbikes.com to satisfy Firebase Auth email requirements
      const email = `${username.trim().toLowerCase()}@pusbikes.com`;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/materi');
    } catch (err) {
      console.error(err);
      setError('Username atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 5rem)', backgroundColor: '#f8fafc' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <FaSignInAlt /> Login
        </h2>
        
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, color: '#334155' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              placeholder="Masukkan password"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
          Belum punya akun? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
