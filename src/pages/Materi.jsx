import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaBookOpen } from 'react-icons/fa';
import { materiList } from '../data';

const Materi = () => {
  const [selectedMateri, setSelectedMateri] = useState(materiList[0]);

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4rem)' }}>
      <div className="page-header" style={{ padding: '1.5rem 0', backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <h1 className="title" style={{ fontSize: '1.8rem', margin: 0, color: 'var(--color-primary)' }}>Materi Pelatihan</h1>
          <p className="subtitle" style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>Pilih materi di samping untuk membaca PDF secara langsung</p>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '350px', backgroundColor: '#f8fafc', borderRight: '2px solid #e2e8f0', overflowY: 'auto', padding: '1.5rem', boxShadow: 'inset -5px 0 10px -10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaBookOpen style={{ color: 'var(--color-primary)' }}/> Daftar Materi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {materiList.map((materi, idx) => {
              const isSelected = selectedMateri === materi;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMateri(materi)}
                  style={{
                    textAlign: 'left',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'white',
                    color: isSelected ? 'white' : '#475569',
                    cursor: 'pointer',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'all 0.2s',
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    boxShadow: isSelected ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem'
                  }}
                >
                  <FaFilePdf style={{ marginTop: '3px', flexShrink: 0, fontSize: '1.2rem', color: isSelected ? '#fff' : '#ef4444' }} />
                  <span>{materi.replace('.pdf', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div style={{ flex: 1, backgroundColor: '#cbd5e1', position: 'relative' }}>
          <iframe
            src={`/downloads/Materi/${selectedMateri}#view=FitH&toolbar=0`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="PDF Viewer"
          />
          <a 
            href={`/downloads/Materi/${selectedMateri}`} 
            download
            className="btn btn-primary"
            style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}
          >
            <FaDownload /> Unduh File Ini
          </a>
        </div>
      </div>
    </div>
  );
};

export default Materi;
