import React, { useState } from 'react';
import { 
  FaFilePowerpoint, FaFilePdf, FaDownload, FaExpand, 
  FaBookOpen, FaCheckCircle, FaChalkboardTeacher, 
  FaSearch, FaChevronRight, FaDesktop
} from 'react-icons/fa';

const PanduanFasilitator = () => {
  const materiList = [
    {
      mpi: 'MPI 1: Analisis Rekam Medis',
      badge: 'MPI 1',
      files: [
        { 
          name: 'Panduan Penugasan MPI 1', 
          type: 'panduan',
          pdfPath: '/materi_fasilitator/Panduan Penugasan MPI1.pdf',
          pptxPath: '/materi_fasilitator/Panduan Penugasan MPI1.pptx' 
        }
      ]
    },
    {
      mpi: 'MPI 2: Kodifikasi ICD-10',
      badge: 'MPI 2',
      files: [
        { 
          name: 'Panduan Penugasan MPI 2', 
          type: 'panduan',
          pdfPath: '/materi_fasilitator/Panduan Penugasan MPI2.pdf',
          pptxPath: '/materi_fasilitator/Panduan Penugasan MPI2.pptx' 
        },
        { 
          name: 'Jawaban SOAL MPI 2 (Final)', 
          type: 'jawaban',
          pdfPath: '/materi_fasilitator/Jawaban SOAL MPI 2 (Final).pdf',
          pptxPath: '/materi_fasilitator/Jawaban SOAL MPI 2 (Final).pptx' 
        }
      ]
    },
    {
      mpi: 'MPI 3: Kodifikasi ICD-9-CM',
      badge: 'MPI 3',
      files: [
        { 
          name: 'Panduan Penugasan MPI 3', 
          type: 'panduan',
          pdfPath: '/materi_fasilitator/Panduan Penugasan MPI3.pdf',
          pptxPath: '/materi_fasilitator/Panduan Penugasan MPI3.pptx' 
        },
        { 
          name: 'Jawaban Soal MPI 3 Fix', 
          type: 'jawaban',
          pdfPath: '/materi_fasilitator/Jawaban Soal MPI-3 Fix.pdf',
          pptxPath: '/materi_fasilitator/Jawaban Soal MPI-3 Fix.pptx' 
        }
      ]
    },
    {
      mpi: 'MPI 4: Ungroupable iDRG',
      badge: 'MPI 4',
      files: [
        { 
          name: 'Panduan Penugasan MPI 4', 
          type: 'panduan',
          pdfPath: '/materi_fasilitator/Panduan Penugasan MPI4.pdf',
          pptxPath: '/materi_fasilitator/Panduan Penugasan MPI4.pptx' 
        },
        { 
          name: 'Jawaban MPI 4 Bekasi 10-15 Nov 2025', 
          type: 'jawaban',
          pdfPath: '/materi_fasilitator/Jawaban MPI 4 Bekasi 10 sd 15 Nov 2025.pdf',
          pptxPath: '/materi_fasilitator/Jawaban MPI 4 Bekasi 10 sd 15 Nov 2025.pptx' 
        }
      ]
    },
    {
      mpi: 'MPI 5: Looker Studio Klaim',
      badge: 'MPI 5',
      files: [
        { 
          name: 'Panduan Penugasan MPI 5 (Analisis Data Klaim iDRG)', 
          type: 'panduan',
          pdfPath: '/materi_fasilitator/Panduan Penugasan MPI5 A21 - Analisis Data Klaim dalam iDRG.pdf',
          pptxPath: '/materi_fasilitator/Panduan Penugasan MPI5 A21 - Analisis Data Klaim dalam iDRG.pptx' 
        }
      ]
    }
  ];

  // Flat list for easy selection
  const allFiles = materiList.flatMap(m => m.files.map(f => ({ ...f, mpiBadge: m.badge, mpiTitle: m.mpi })));
  
  const [selectedFile, setSelectedFile] = useState(allFiles[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const viewerElement = document.getElementById('fasilitator-pdf-frame');
    if (viewerElement) {
      if (!document.fullscreenElement) {
        if (viewerElement.requestFullscreen) {
          viewerElement.requestFullscreen();
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
      
      {/* Top Header / Sub-nav Bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
            <FaChalkboardTeacher />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f2e46' }}>Panduan & Kunci Jawaban Fasilitator</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Preview Dokumen Langsung • Fit To Width Screen</div>
          </div>
        </div>

        {/* Action Controls for Selected File */}
        {selectedFile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button 
              onClick={toggleFullscreen}
              className="btn btn-outline"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: '#0f2e46', color: '#0f2e46' }}
            >
              <FaExpand /> Layar Penuh (Fullscreen)
            </button>

            <a 
              href={selectedFile.pdfPath} 
              download 
              className="btn btn-outline"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: '#ef4444', color: '#ef4444' }}
            >
              <FaFilePdf /> Unduh PDF
            </a>

            <a 
              href={selectedFile.pptxPath} 
              download 
              className="btn btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <FaDownload /> Unduh PPTX Original
            </a>
          </div>
        )}
      </div>

      {/* Main Content Area: Sidebar Selection + PDF Viewer */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Sidebar List */}
        <div style={{ 
          width: '340px', 
          backgroundColor: '#ffffff', 
          borderRight: '1px solid #e2e8f0', 
          overflowY: 'auto', 
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          flexShrink: 0
        }}>
          
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>
            DAFTAR DOKUMEN PANDUAN & JAWABAN
          </div>

          {materiList.map((group, gIdx) => (
            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0.4rem' }}>
                <span style={{ backgroundColor: '#0f2e46', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {group.badge}
                </span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                  {group.mpi}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem' }}>
                {group.files.map((file, fIdx) => {
                  const isSelected = selectedFile.pdfPath === file.pdfPath;
                  return (
                    <button
                      key={fIdx}
                      onClick={() => setSelectedFile({ ...file, mpiBadge: group.badge, mpiTitle: group.mpi })}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 0.85rem',
                        border: '1px solid',
                        borderColor: isSelected ? '#0d9488' : '#e2e8f0',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                        color: isSelected ? '#0f766e' : '#334155',
                        cursor: 'pointer',
                        fontWeight: isSelected ? 700 : 500,
                        transition: 'all 0.2s',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        boxShadow: isSelected ? '0 2px 8px rgba(13,148,136,0.15)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                        {file.type === 'jawaban' ? (
                          <FaCheckCircle style={{ color: '#10b981', flexShrink: 0, fontSize: '1rem' }} />
                        ) : (
                          <FaFilePdf style={{ color: '#ef4444', flexShrink: 0, fontSize: '1rem' }} />
                        )}
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {file.name}
                        </span>
                      </div>
                      
                      <span style={{ 
                        fontSize: '0.68rem', 
                        fontWeight: 700, 
                        padding: '0.1rem 0.4rem', 
                        borderRadius: '4px', 
                        flexShrink: 0,
                        backgroundColor: file.type === 'jawaban' ? '#dcfce7' : '#e0f2fe',
                        color: file.type === 'jawaban' ? '#166534' : '#0369a1'
                      }}>
                        {file.type === 'jawaban' ? 'KUNCI' : 'PANDUAN'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

        {/* Right Embedded PDF Presentation Viewer (Fit to Width & Screen-Filling) */}
        <div style={{ flex: 1, backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          
          {/* Active File Title Banner */}
          <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '0.65rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ backgroundColor: '#0d9488', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                {selectedFile.mpiBadge}
              </span>
              <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{selectedFile.name}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mode Display: Fit to Width</span>
          </div>

          {/* PDF View Frame */}
          <iframe
            id="fasilitator-pdf-frame"
            src={`${selectedFile.pdfPath}#view=FitH&toolbar=1&navpanes=0`}
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#334155' }}
            title={`Preview ${selectedFile.name}`}
          />
        </div>

      </div>

    </div>
  );
};

export default PanduanFasilitator;
