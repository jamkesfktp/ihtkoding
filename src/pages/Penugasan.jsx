import React from 'react';
import { FaGoogle, FaUsers, FaTasks } from 'react-icons/fa';

const Penugasan = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="title">Workspace Penugasan</h1>
          <p className="subtitle">Area kolaborasi online untuk mengerjakan tugas secara bersama-sama</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid grid-cols-1" style={{ gap: '3rem' }}>
          
          {/* Card Info */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', color: 'white', borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <FaUsers style={{ fontSize: '2rem' }} />
              <h2 style={{ color: 'white', margin: 0 }}>Instruksi Pengerjaan Kelompok</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', maxWidth: '800px' }}>
              Pengerjaan tugas studi kasus dilakukan secara berkelompok menggunakan platform kolaboratif. Silakan buka tautan Google Docs di bawah ini untuk mulai berdiskusi dan mengetik jawaban bersama tim Anda secara *real-time*.
            </p>
          </div>

          {/* Embed Google Docs / Collaboration Area */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <FaGoogle style={{ color: '#ea4335' }} /> Dokumen Kolaborasi Tim
              </div>
              <a href="#" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                Buka di Tab Baru
              </a>
            </div>
            <div style={{ flex: 1, backgroundColor: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
              <FaTasks style={{ fontSize: '4rem', color: '#dadce0' }} />
              <p style={{ color: 'var(--color-text-light)', maxWidth: '400px', textAlign: 'center' }}>
                (Area ini akan menampilkan iFrame Google Docs atau Microsoft Word Online yang telah disiapkan untuk masing-masing kelompok)
              </p>
              <button className="btn btn-primary">Sambungkan Akun Google</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Penugasan;
