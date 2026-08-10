import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaExpand, FaCompress, FaDesktop, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import pptxgen from 'pptxgenjs';

const SlidePresentationModal = ({ isOpen, onClose, answers, userData, cases, kuantitatifParams, kualitatifParams }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate slide list from cases and userData
  const slides = [
    // Slide Cover
    {
      type: 'cover',
      title: 'LAPORAN HASIL ANALISIS REKAM MEDIS (MPI 1)',
      subtitle: 'Analisis Kuantitatif & Kualitatif Dokumen Rekam Medis Pasien FPKTL',
      pesertaName: userData?.namaLengkap || userData?.username || 'Peserta Pelatihan',
      instansi: userData?.instansi || 'Fasilitas Kesehatan Rujukan Tingkat Lanjut',
      kelompok: userData?.kelompok ? `Kelompok ${userData.kelompok}` : '-',
      angkatan: userData?.angkatan ? `Angkatan ${userData.angkatan}` : '-',
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    },
    // Slide for each Case (Kasus 1 - 4)
    ...cases.map(c => {
      const caseData = answers[c.id] || {};
      const identitas = caseData.identitas || {};
      const kuantitatif = caseData.kuantitatif || {};
      const kualitatif = caseData.kualitatif || {};
      const rekomendasi = caseData.rekomendasi || [];
      const kesimpulan = caseData.kesimpulan || '';

      // Calculate total kuantitatif score
      let totalKuantitatif = 0;
      let maxKuantitatif = 0;
      kuantitatifParams.forEach(p => {
        maxKuantitatif += p.max;
        const val = parseInt(kuantitatif[p.id]?.skor || 0, 10);
        if (!isNaN(val)) totalKuantitatif += val;
      });

      // Calculate total kualitatif score
      let totalKualitatif = 0;
      let maxKualitatif = 0;
      kualitatifParams.forEach(p => {
        maxKualitatif += p.max;
        const val = parseInt(kualitatif[p.id]?.skor || 0, 10);
        if (!isNaN(val)) totalKualitatif += val;
      });

      return {
        type: 'case',
        caseId: c.id,
        title: c.title,
        identitas,
        kuantitatif,
        kualitatif,
        totalKuantitatif,
        maxKuantitatif,
        pctKuantitatif: maxKuantitatif > 0 ? Math.round((totalKuantitatif / maxKuantitatif) * 100) : 0,
        totalKualitatif,
        maxKualitatif,
        pctKualitatif: maxKualitatif > 0 ? Math.round((totalKualitatif / maxKualitatif) * 100) : 0,
        rekomendasi,
        kesimpulan
      };
    }),
    // Slide Ringkasan Akhir
    {
      type: 'summary',
      title: 'RINGKASAN HASIL AUDIT REKAM MEDIS',
      subtitle: 'Evaluasi Keseluruhan Kelengkapan & Kesesuaian Koding'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, isFullscreen]);

  if (!isOpen) return null;

  const currentSlideData = slides[currentSlide];

  // Function to Export PowerPoint .pptx File
  const handleDownloadPPTX = async () => {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';

    // Theme Colors
    const NAVY = '0F172A';
    const TEAL = '0D9488';
    const LIGHT_BG = 'F8FAFC';
    const TEXT_DARK = '1E293B';
    const WHITE = 'FFFFFF';

    // 1. Cover Slide
    const coverSlide = pres.addSlide();
    coverSlide.background = { color: NAVY };

    coverSlide.addText('LAPORAN HASIL ANALISIS REKAM MEDIS (MPI 1)', {
      x: 0.8, y: 1.5, w: 8.4, h: 1.2,
      fontSize: 28, bold: true, color: WHITE, align: 'left'
    });

    coverSlide.addText('Analisis Kuantitatif & Kualitatif Dokumen Rekam Medis Pasien FPKTL', {
      x: 0.8, y: 2.7, w: 8.4, h: 0.6,
      fontSize: 16, color: TEAL, align: 'left'
    });

    coverSlide.addShape(pres.ShapeType.line, {
      x: 0.8, y: 3.5, w: 8.4, h: 0, line: { color: TEAL, width: 2 }
    });

    coverSlide.addText([
      { text: 'Presenter: ', options: { bold: true, color: WHITE } },
      { text: `${userData?.namaLengkap || userData?.username || 'Peserta Pelatihan'}\n`, options: { color: WHITE } },
      { text: 'Instansi: ', options: { bold: true, color: WHITE } },
      { text: `${userData?.instansi || '-'}\n`, options: { color: WHITE } },
      { text: 'Kelompok: ', options: { bold: true, color: WHITE } },
      { text: `${userData?.kelompok ? 'Kelompok ' + userData.kelompok : '-'}\n`, options: { color: WHITE } }
    ], { x: 0.8, y: 4.0, w: 8.4, h: 1.8, fontSize: 14, align: 'left' });

    // 2. Case Slides (Kasus 1 - 4)
    cases.forEach(c => {
      const caseData = answers[c.id] || {};
      const identitas = caseData.identitas || {};
      const kuantitatif = caseData.kuantitatif || {};
      const kualitatif = caseData.kualitatif || {};
      const kesimpulan = caseData.kesimpulan || '-';

      const slide = pres.addSlide();
      slide.background = { color: LIGHT_BG };

      // Header Banner
      slide.addShape(pres.ShapeType.rect, {
        x: 0, y: 0, w: 10, h: 1.0, fill: { color: NAVY }
      });
      slide.addText(`HASIL AUDIT: ${c.title.toUpperCase()}`, {
        x: 0.6, y: 0.25, w: 8.8, h: 0.5,
        fontSize: 20, bold: true, color: WHITE
      });

      // Left Box: Identitas & Skor Summary
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.6, y: 1.3, w: 4.2, h: 5.5, fill: { color: WHITE }, line: { color: 'CBD5E1', width: 1 }
      });
      slide.addText('IDENTITAS PASIEN', {
        x: 0.8, y: 1.5, w: 3.8, h: 0.4, fontSize: 14, bold: true, color: TEAL
      });
      slide.addText([
        { text: '• No. RM: ', options: { bold: true } }, { text: `${identitas.noRm || '-'}\n` },
        { text: '• No. SEP: ', options: { bold: true } }, { text: `${identitas.noSep || '-'}\n` },
        { text: '• Nama Pasien: ', options: { bold: true } }, { text: `${identitas.namaPasien || '-'}\n` },
        { text: '• DPJP: ', options: { bold: true } }, { text: `${identitas.namaDpjp || '-'}\n` }
      ], { x: 0.8, y: 2.0, w: 3.8, h: 1.8, fontSize: 11, color: TEXT_DARK });

      slide.addText('KESIMPULAN AUDIT', {
        x: 0.8, y: 4.0, w: 3.8, h: 0.4, fontSize: 14, bold: true, color: TEAL
      });
      slide.addText(kesimpulan || 'Tidak ada kesimpulan khusus yang diinputkan.', {
        x: 0.8, y: 4.5, w: 3.8, h: 2.0, fontSize: 11, color: TEXT_DARK
      });

      // Right Box: Skor Kuantitatif & Kualitatif Details
      slide.addShape(pres.ShapeType.roundRect, {
        x: 5.1, y: 1.3, w: 4.3, h: 5.5, fill: { color: WHITE }, line: { color: 'CBD5E1', width: 1 }
      });

      slide.addText('ANALISIS AUDIT', {
        x: 5.3, y: 1.5, w: 3.9, h: 0.4, fontSize: 14, bold: true, color: TEAL
      });

      // Table for Audit Summary
      let kuantitatifScore = 0;
      kuantitatifParams.forEach(p => kuantitatifScore += parseInt(kuantitatif[p.id]?.skor || 0, 10));
      let kualitatifScore = 0;
      kualitatifParams.forEach(p => kualitatifScore += parseInt(kualitatif[p.id]?.skor || 0, 10));

      const tableRows = [
        [{ text: 'Komponen Audit', options: { bold: true, fill: { color: 'F1F5F9' } } }, { text: 'Skor Total', options: { bold: true, fill: { color: 'F1F5F9' } } }],
        [{ text: 'Analisis Kuantitatif' }, { text: `${kuantitatifScore} / 100` }],
        [{ text: 'Analisis Kualitatif' }, { text: `${kualitatifScore} / 100` }]
      ];

      slide.addTable(tableRows, {
        x: 5.3, y: 2.1, w: 3.9, h: 1.2,
        colW: [2.5, 1.4], fontSize: 11, border: { pt: 1, color: 'E2E8F0' }
      });

      slide.addText('CATATAN REKOMENDASI', {
        x: 5.3, y: 3.6, w: 3.9, h: 0.4, fontSize: 13, bold: true, color: NAVY
      });

      const recs = caseData.rekomendasi || [];
      const recText = recs.length > 0 
        ? recs.map(r => `• Diagnosa: ${r.diagnosa || '-'}\n  Rekomendasi: ${r.hal || '-'}`).join('\n')
        : 'Sesuai dengan pedoman koding ICD-10 dan ICD-9-CM.';

      slide.addText(recText, {
        x: 5.3, y: 4.1, w: 3.9, h: 2.4, fontSize: 10, color: TEXT_DARK
      });
    });

    // Save File
    await pres.writeFile({ fileName: `Slide_MPI1_${userData?.namaLengkap || 'Peserta'}.pptx` });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: isFullscreen ? '#0f172a' : 'rgba(15, 23, 42, 0.9)',
      zIndex: 99999, display: 'flex', flexDirection: 'column',
      backdropFilter: 'blur(8px)', transition: 'all 0.3s'
    }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1e293b', borderBottom: '1px solid #334155', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaDesktop style={{ color: '#0d9488', fontSize: '1.2rem' }} />
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Slide Presentasi Hasil Audit (MPI 1)</span>
          <span style={{ backgroundColor: '#0d9488', fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 'bold' }}>
            Slide {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={handleDownloadPPTX}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            <FaDownload /> Download PPTX
          </button>
          
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '0.5rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>

          <button 
            onClick={onClose}
            style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}
            title="Tutup Modal"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Main Slide Viewer */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isFullscreen ? '1rem' : '2rem', overflow: 'hidden' }}>
        
        <div style={{
          width: '100%', maxWidth: '1100px', aspectRatio: '16/9',
          backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative'
        }}>

          {/* SLIDE TYPE: COVER */}
          {currentSlideData.type === 'cover' && (
            <div style={{ flex: 1, backgroundColor: '#0f172a', color: 'white', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: 'radial-gradient(circle at 90% 10%, #1e293b 0%, #0f172a 70%)' }}>
              <div style={{ color: '#0d9488', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Pelatihan Koding Bagi Tenaga Koder FPKTL
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.2, color: '#f8fafc' }}>
                {currentSlideData.title}
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '3rem', fontWeight: 400 }}>
                {currentSlideData.subtitle}
              </p>

              <div style={{ borderTop: '2px solid #0d9488', paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '1rem' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>PRESENTER AUDITOR</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#f1f5f9' }}>{currentSlideData.pesertaName}</div>
                  <div style={{ color: '#0d9488' }}>{currentSlideData.instansi}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>KELOMPOK / TANGGAL</div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{currentSlideData.kelompok} ({currentSlideData.angkatan})</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{currentSlideData.tanggal}</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: CASE */}
          {currentSlideData.type === 'case' && (
            <div style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {/* Slide Top Banner */}
              <div style={{ backgroundColor: '#0f172a', padding: '1.25rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>HASIL ANALISIS REKAM MEDIS</span>
                  <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{currentSlideData.title}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', textAlign: 'center', border: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>KUANTITATIF</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: currentSlideData.pctKuantitatif >= 80 ? '#10b981' : '#f59e0b' }}>
                      {currentSlideData.pctKuantitatif}%
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '6px', textAlign: 'center', border: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>KUALITATIF</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: currentSlideData.pctKualitatif >= 80 ? '#10b981' : '#f59e0b' }}>
                      {currentSlideData.pctKualitatif}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Body */}
              <div style={{ flex: 1, padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', overflowY: 'auto' }}>
                
                {/* Left Card: Identitas Pasien & Kesimpulan */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0d9488', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                      📋 Identitas Dokumen RM
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.9rem' }}>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>NO. RM</span>
                        <div style={{ fontWeight: 600 }}>{currentSlideData.identitas.noRm || '-'}</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>NO. SEP</span>
                        <div style={{ fontWeight: 600 }}>{currentSlideData.identitas.noSep || '-'}</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>NAMA PASIEN</span>
                        <div style={{ fontWeight: 600 }}>{currentSlideData.identitas.namaPasien || '-'}</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>DPJP</span>
                        <div style={{ fontWeight: 600 }}>{currentSlideData.identitas.namaDpjp || '-'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#0d9488' }}>
                      💡 Kesimpulan Audit
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                      {currentSlideData.kesimpulan || 'Tidak ada catatan kesimpulan khusus.'}
                    </p>
                  </div>
                </div>

                {/* Right Card: Rekomendasi & Catatan Audit */}
                <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    📌 Rekomendasi Koding & Perbaikan
                  </h3>

                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {currentSlideData.rekomendasi.length > 0 ? (
                      currentSlideData.rekomendasi.map((rec, idx) => (
                        <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '0.8rem', borderRadius: '6px', borderLeft: '3px solid #0d9488', fontSize: '0.85rem' }}>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{rec.diagnosa || `Rekomendasi ${idx + 1}`}</div>
                          <div style={{ color: '#475569', marginTop: '0.2rem' }}>{rec.hal || '-'}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        Tidak ada rekomendasi khusus yang ditambahkan.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SLIDE TYPE: SUMMARY */}
          {currentSlideData.type === 'summary' && (
            <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem' }}>
                {currentSlideData.title}
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
                {currentSlideData.subtitle}
              </p>

              <div style={{ backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                      <th style={{ padding: '0.8rem 1rem' }}>Kasus Rekam Medis</th>
                      <th style={{ padding: '0.8rem 1rem' }}>No. RM / Pasien</th>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>Skor Kuantitatif</th>
                      <th style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>Skor Kualitatif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((c) => {
                      const caseData = answers[c.id] || {};
                      const identitas = caseData.identitas || {};
                      
                      let totalKuantitatif = 0;
                      kuantitatifParams.forEach(p => totalKuantitatif += parseInt(caseData.kuantitatif?.[p.id]?.skor || 0, 10));
                      
                      let totalKualitatif = 0;
                      kualitatifParams.forEach(p => totalKualitatif += parseInt(caseData.kualitatif?.[p.id]?.skor || 0, 10));

                      return (
                        <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.8rem 1rem', fontWeight: 600, color: '#1e293b' }}>{c.title}</td>
                          <td style={{ padding: '0.8rem 1rem', color: '#475569' }}>{identitas.noRm || '-'} ({identitas.namaPasien || '-'})</td>
                          <td style={{ padding: '0.8rem 1rem', textAlign: 'center', fontWeight: 'bold', color: totalKuantitatif >= 80 ? '#10b981' : '#f59e0b' }}>
                            {totalKuantitatif} / 100
                          </td>
                          <td style={{ padding: '0.8rem 1rem', textAlign: 'center', fontWeight: 'bold', color: totalKualitatif >= 80 ? '#10b981' : '#f59e0b' }}>
                            {totalKualitatif} / 100
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Slide Footer Controls */}
          <div style={{ backgroundColor: '#1e293b', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '0.85rem' }}>
            <div>Gunakan Tombol Panah ← → pada Keyboard untuk Mengubah Slide</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
                disabled={currentSlide === 0}
                style={{ backgroundColor: currentSlide === 0 ? '#334155' : '#0d9488', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: currentSlide === 0 ? 'not-allowed' : 'pointer' }}
              >
                <FaChevronLeft /> Prev
              </button>
              <button 
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
                disabled={currentSlide === slides.length - 1}
                style={{ backgroundColor: currentSlide === slides.length - 1 ? '#334155' : '#0d9488', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SlidePresentationModal;
