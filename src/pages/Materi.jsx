import React from 'react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { materiList } from '../data';

const Materi = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="title">Materi Pelatihan</h1>
          <p className="subtitle">Kumpulan modul dan presentasi untuk panduan belajar Anda</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="grid grid-cols-2">
          {materiList.map((materi, index) => (
            <div className="card" key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
              <div className="card-icon" style={{ marginBottom: 0, flexShrink: 0, backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <FaFilePdf />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{materi.replace('.pdf', '')}</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Dokumen PDF</p>
              </div>
              <a 
                href={`/downloads/Materi/${materi}`} 
                download
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', flexShrink: 0 }}
                title="Unduh Materi"
              >
                <FaDownload />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materi;
