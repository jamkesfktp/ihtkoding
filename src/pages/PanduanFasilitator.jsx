import React from 'react';
import { FaFilePowerpoint, FaDownload } from 'react-icons/fa';

const PanduanFasilitator = () => {
  const materiList = [
    {
      mpi: 'MPI 1',
      files: [
        { name: 'Panduan Penugasan MPI 1', path: '/materi_fasilitator/Panduan Penugasan MPI1.pptx' }
      ]
    },
    {
      mpi: 'MPI 2',
      files: [
        { name: 'Panduan Penugasan MPI 2', path: '/materi_fasilitator/Panduan Penugasan MPI2.pptx' },
        { name: 'Jawaban SOAL MPI 2', path: '/materi_fasilitator/Jawaban SOAL MPI 2 (Final).pptx' }
      ]
    },
    {
      mpi: 'MPI 3',
      files: [
        { name: 'Panduan Penugasan MPI 3', path: '/materi_fasilitator/Panduan Penugasan MPI3.pptx' },
        { name: 'Jawaban Soal MPI 3', path: '/materi_fasilitator/Jawaban Soal MPI-3 Fix.pptx' }
      ]
    },
    {
      mpi: 'MPI 4',
      files: [
        { name: 'Panduan Penugasan MPI 4', path: '/materi_fasilitator/Panduan Penugasan MPI4.pptx' },
        { name: 'Jawaban MPI 4', path: '/materi_fasilitator/Jawaban MPI 4 Bekasi 10 sd 15 Nov 2025.pptx' }
      ]
    },
    {
      mpi: 'MPI 5',
      files: [
        { name: 'Panduan Penugasan MPI 5', path: '/materi_fasilitator/Panduan Penugasan MPI5 A21 - Analisis Data Klaim dalam iDRG.pptx' }
      ]
    }
  ];

  return (
    <div className="container page-container">
      <div className="page-header text-center fade-in">
        <h1 className="page-title text-gradient">Panduan & Jawaban Fasilitator</h1>
        <p className="page-subtitle">File PPT panduan penugasan dan jawaban soal untuk fasilitator</p>
      </div>

      <div className="materi-list slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {materiList.map((materi, index) => (
          <div key={index} className="materi-card glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary-dark)' }}>{materi.mpi}</h2>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {materi.files.map((file, fileIdx) => (
                <div key={fileIdx} className="file-item" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '200px' }}>
                    <FaFilePowerpoint size={24} color="#D04423" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 500, wordBreak: 'break-word' }}>{file.name}</span>
                  </div>
                  <a href={file.path} download className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}>
                    <FaDownload /> Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanduanFasilitator;
