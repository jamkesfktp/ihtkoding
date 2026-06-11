import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilePowerpoint, FaFileWord, FaDownload, FaLaptopCode } from 'react-icons/fa';
import { soalList } from '../data';

const Soal = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="title">Bank Soal & Evaluasi</h1>
          <p className="subtitle">Uji kemampuan koding Anda melalui pre-test dan post-test</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid grid-cols-2">
          {soalList.map((soal, index) => {
            const isWord = soal.endsWith('.docx');
            return (
              <div className="card" key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                <div className="card-icon" style={{ 
                  marginBottom: 0, flexShrink: 0, 
                  backgroundColor: isWord ? '#eff6ff' : '#fff1f2', 
                  color: isWord ? '#3b82f6' : '#e11d48' 
                }}>
                  {isWord ? <FaFileWord /> : <FaFilePowerpoint />}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {soal.replace('.pptx', '').replace('.docx', '').replace(/_/g, ' ')}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                    {isWord ? 'Dokumen Evaluasi' : 'Presentasi / Soal Evaluasi'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {isWord && (
                    <Link to="/quiz" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                      <FaLaptopCode /> Kerjakan Online
                    </Link>
                  )}
                  <a 
                    href={`/downloads/Soal/${soal}`} 
                    download
                    className="btn btn-outline"
                    style={{ 
                      padding: '0.5rem 1rem', 
                      borderColor: isWord ? '#3b82f6' : '#e11d48', 
                      color: isWord ? '#3b82f6' : '#e11d48' 
                    }}
                    title="Unduh Soal"
                  >
                    <FaDownload />
                  </a>
                </div>
              </div>
            );
          })}
          
          {/* Static card for other folders */}
          <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
            <div className="card-icon" style={{ marginBottom: 0, flexShrink: 0, backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <FaFilePowerpoint />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Soal Penugasan MPI 1 - 4</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Arsip Folder Penugasan</p>
            </div>
            <button 
              className="btn btn-outline"
              style={{ padding: '0.5rem 1rem', flexShrink: 0 }}
              onClick={() => alert('Folder soal tersedia di direktori lokal.')}
            >
              Lihat Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soal;
