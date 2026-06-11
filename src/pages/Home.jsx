import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaTasks, FaCalendarAlt, FaFileCode } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero" style={{ 
        padding: '6rem 0', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-bg))'
      }}>
        <div className="container">
          <h1 className="title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
            Workshop Pelatihan Koding
          </h1>
          <p className="subtitle" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--color-text)' }}>
            RSUP Dr. Sardjito, Yogyakarta. Tingkatkan kompetensi koding medis dan pemahaman JKN-INA CBG's bersama ahlinya.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/materi" className="btn btn-primary">
              Mulai Belajar
            </Link>
            <Link to="/jadwal" className="btn btn-outline">
              Lihat Jadwal
            </Link>
          </div>
        </div>
      </section>

      <section className="features" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="card">
              <div className="card-icon"><FaBook /></div>
              <h3 className="card-title">Materi Terpadu</h3>
              <p className="card-desc">Akses seluruh modul pelatihan, dari aturan dasar ICD-10 hingga analisis data klaim JKN dalam iDRG.</p>
              <div className="card-footer">
                <Link to="/materi" className="text-primary" style={{ fontWeight: 600 }}>Lihat Materi &rarr;</Link>
              </div>
            </div>
            
            <div className="card">
              <div className="card-icon"><FaFileCode /></div>
              <h3 className="card-title">Evaluasi & Soal</h3>
              <p className="card-desc">Uji pemahaman Anda melalui pre-test, post-test, dan berbagai latihan soal koding rekam medis.</p>
              <div className="card-footer">
                <Link to="/soal" className="text-primary" style={{ fontWeight: 600 }}>Kerjakan Soal &rarr;</Link>
              </div>
            </div>

            <div className="card">
              <div className="card-icon"><FaTasks /></div>
              <h3 className="card-title">Penugasan Kolaboratif</h3>
              <p className="card-desc">Selesaikan studi kasus secara bersama-sama dalam ruang kerja online yang terintegrasi.</p>
              <div className="card-footer">
                <Link to="/penugasan" className="text-primary" style={{ fontWeight: 600 }}>Masuk Workspace &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
