import React, { useState } from 'react';
import { FaFilePdf, FaExpand, FaBookOpen, FaLock, FaChevronRight } from 'react-icons/fa';
import { materiList } from '../data';

const Materi = () => {
  const [selectedMateri, setSelectedMateri] = useState(materiList[0]);

  const toggleFullscreen = () => {
    const frameElement = document.getElementById('materi-pdf-container');
    if (frameElement) {
      if (!document.fullscreenElement) {
        if (frameElement.requestFullscreen) {
          frameElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 4.5rem)', backgroundColor: '#f8fafc' }}>
      
      {/* Page Sub-Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
            <FaBookOpen />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f2e46' }}>Modul Materi Pelatihan</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Pembacaan PDF On-Screen • Protected View</div>
          </div>
        </div>

        {/* Action Controls for Selected Material */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '6px' }}>
            <FaLock style={{ color: '#0d9488' }} /> Mode Hanya Baca (Protected View)
          </span>

          <button 
            onClick={toggleFullscreen}
            className="btn btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FaExpand /> Layar Penuh (Fullscreen)
          </button>
        </div>
      </div>

      {/* Main Area: Sidebar List + Viewer */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar */}
        <div style={{ 
          width: '340px', 
          backgroundColor: '#ffffff', 
          borderRight: '1px solid #e2e8f0', 
          overflowY: 'auto', 
          padding: '1rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem',
          flexShrink: 0 
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            DAFTAR MODUL MATERI ({materiList.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {materiList.map((materi, idx) => {
              const isSelected = selectedMateri === materi;
              const cleanTitle = materi.replace('.pdf', '');
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMateri(materi)}
                  style={{
                    textAlign: 'left',
                    padding: '0.85rem 1rem',
                    border: '1px solid',
                    borderColor: isSelected ? '#0d9488' : '#e2e8f0',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                    color: isSelected ? '#0f766e' : '#334155',
                    cursor: 'pointer',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.2s',
                    fontSize: '0.88rem',
                    lineHeight: '1.4',
                    boxShadow: isSelected ? '0 2px 8px rgba(13,148,136,0.15)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
                    <FaFilePdf style={{ flexShrink: 0, fontSize: '1.1rem', color: isSelected ? '#0d9488' : '#ef4444' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cleanTitle}</span>
                  </div>
                  {isSelected && <FaChevronRight style={{ fontSize: '0.75rem', color: '#0d9488', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div id="materi-pdf-container" style={{ flex: 1, backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          
          {/* Active Title Banner */}
          <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '0.65rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FaFilePdf style={{ color: '#ef4444' }} />
              <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{selectedMateri.replace('.pdf', '')}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fit to Width • Restricted Download</span>
          </div>

          {/* Embedded Viewer iframe */}
          <iframe
            src={`/downloads/Materi/${selectedMateri}#view=FitH&toolbar=0&navpanes=0`}
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#334155' }}
            title={`PDF Viewer ${selectedMateri}`}
          />
        </div>

      </div>

    </div>
  );
};

export default Materi;
