import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaUsers, FaTasks, FaFileSignature } from 'react-icons/fa';

const Penugasan = () => {
  const navigate = useNavigate();
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
          {/* Card untuk Pre-Test */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #8b5cf6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#6d28d9', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Pre-Test
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Kerjakan Pre-Test sebelum memulai materi untuk mengukur kemampuan awal Anda.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-pretest')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' }}
              >
                Mulai Pre-Test Sekarang
              </button>
            </div>
          </div>

          {/* Card untuk Native Quiz MPI 1 */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #059669' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#047857', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Ujian Penugasan MPI 1 (Analisis RM)
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Lakukan penilaian analisis kuantitatif dan kualitatif dokumen rekam medis untuk keperluan klaim JKN.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-mpi1')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#059669', borderColor: '#059669' }}
              >
                Mulai Ujian MPI 1 Sekarang
              </button>
            </div>
          </div>

          {/* Card untuk Native Quiz MPI 2 */}
          <div className="card" style={{ padding: '2rem', border: '2px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--color-secondary)', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Ujian Penugasan MPI 2 (Sistem Native)
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Isi soal ujian secara langsung dengan tampilan PDF di sebelah layar dan perhitungan nilai otomatis.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-mpi2')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem' }}
              >
                Mulai Ujian MPI 2 Sekarang
              </button>
            </div>
          </div>

          {/* Card untuk Native Quiz MPI 3 */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #8b5cf6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#6d28d9', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Ujian Penugasan MPI 3 (Sistem Native)
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Selesaikan kuis studi kasus MPI 3 dengan pengisian kode yang terintegrasi PDF.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-mpi3')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' }}
              >
                Mulai Ujian MPI 3 Sekarang
              </button>
            </div>
          </div>

          {/* Card untuk Native Quiz MPI 4 */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #ea580c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#c2410c', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Ujian Penugasan MPI 4 (Trouble Shooting E-Klaim)
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Catat hasil evaluasi dan narasi solusi saat melakukan trouble shooting pada sistem E-Klaim INA-CBG.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-mpi4')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#ea580c', borderColor: '#ea580c' }}
              >
                Mulai Ujian MPI 4 Sekarang
              </button>
            </div>
          </div>

          {/* Card untuk Penugasan MPI 5 */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #0ea5e9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#0284c7', fontSize: '1.4rem' }}>
                  <FaTasks /> Ujian Penugasan MPI 5 (Analisis & Pengolahan Data Klaim)
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Lakukan pengolahan, penyajian dan interpretasi data menggunakan TXT untuk ditampilkan pada Google Slide.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/penugasan-mpi5')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#0ea5e9', borderColor: '#0ea5e9' }}
              >
                Lihat Instruksi MPI 5
              </button>
            </div>
          </div>

          {/* Card untuk Post-Test */}
          <div className="card" style={{ padding: '2rem', border: '2px solid #ec4899', marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#be185d', fontSize: '1.4rem' }}>
                  <FaFileSignature /> Post-Test
                </h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
                  Kerjakan Post-Test setelah menyelesaikan seluruh materi untuk mengukur peningkatan kemampuan Anda.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/quiz-posttest')}
                style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', backgroundColor: '#ec4899', borderColor: '#ec4899' }}
              >
                Mulai Post-Test Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Penugasan;
