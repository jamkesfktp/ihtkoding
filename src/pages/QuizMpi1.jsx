import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaArrowLeft, FaArrowRight, FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const cases = [
  { id: 1, title: "Kasus RM 1", pdfUrl: "/pdfs/mpi1-soal-1.pdf" },
  { id: 2, title: "Kasus RM 2", pdfUrl: "/pdfs/mpi1-soal-2.pdf" },
  { id: 3, title: "Kasus RM 3", pdfUrl: "/pdfs/mpi1-soal-3.pdf" },
  { id: 4, title: "Kasus RM 4", pdfUrl: "/pdfs/mpi1-soal-4.pdf" }
];

const kuantitatifParams = [
  { id: 'A1', section: 'A. SEP', label: 'Kesesuaian Tanggal', max: 10, desc: 'Skor 10: Sesuai, Skor 0: Tidak sesuai' },
  { id: 'B1', section: 'B. RESUME MEDIS', label: 'Identitas Pasien Lengkap', max: 5, desc: 'Skor 5: Lengkap, Skor 3: Kurang, Skor 0: Tidak ada' },
  { id: 'B2', label: 'Tanggal & Jam Masuk/Keluar', max: 5, desc: 'Skor 5: Lengkap, 3: Tgl saja, 0: Tidak ada' },
  { id: 'B3', label: 'Anamnesis & Kondisi Saat Masuk', max: 5, desc: 'Skor 5: Jelas, 0: Tidak ada' },
  { id: 'B4', label: 'Diagnosa Utama & Sekunder', max: 15, desc: 'Skor 15: Lengkap & Sesuai, 10: Kurang tepat, 5: Hanya kode, 0: Tidak ada' },
  { id: 'B5', label: 'Prosedur/Tindakan Medis', max: 15, desc: 'Skor 15: Lengkap, 10: Kurang, 5: Hanya kode, 0: Tidak ada' },
  { id: 'B6', label: 'Pengobatan & Tatalaksana', max: 5, desc: 'Skor 5: Rinci, 0: Tidak diuraikan' },
  { id: 'B7', label: 'Hasil Pemeriksaan Penunjang', max: 5, desc: 'Skor 5: Ada hasil kritikal, 0: Tidak ada' },
  { id: 'B8', label: 'Kondisi & Rencana Saat Pulang', max: 5, desc: 'Skor 5: Jelas, 3: Hanya kontrol ulang, 0: Tidak ada' },
  { id: 'B9', label: 'Autentikasi DPJP (Nama & TTD)', max: 10, desc: 'Skor 10: Lengkap, 5: TTD/cap saja, 0: Tidak ada' },
  { id: 'B10', label: 'Tanggal Pembuatan Resume', max: 5, desc: 'Skor 5: Dibuat ≤ 2x24 jam, 0: Tidak sesuai' },
  { id: 'C1', section: 'C. DOKUMEN PENDUKUNG', label: 'Surat Keterangan Meninggal*', max: 5, desc: 'Skor 5: Lengkap, 0: Tidak ada, NA: Tdk berlaku' },
  { id: 'C2', label: 'Laporan Operasi/Tindakan', max: 5, desc: 'Skor 5: Sesuai, 0: Tidak ada, NA: Tdk berlaku' },
  { id: 'C3', label: 'Informed Consent*', max: 5, desc: 'Skor 5: Tersedia, 0: Tidak ada, NA: Tdk berlaku' }
];

const kualitatifParams = [
  { id: 'A1', section: 'A. Kesesuaian Diagnosa', label: 'Diagnosa Utama vs Temuan Klinis', max: 15, desc: '15: Sangat didukung, 10: Kurang, 0: Tidak didukung' },
  { id: 'A2', label: 'Diagnosa Sekunder vs Komplikasi/Komorbid', max: 10, desc: '10: Relevan, 5: Kurang, 0: Tidak relevan' },
  { id: 'A3', label: 'Urutan Penulisan Diagnosa', max: 5, desc: '5: Urutan benar, 0: Salah' },
  { id: 'B1', section: 'B. Kesesuaian Tatalaksana', label: 'Pengobatan dengan Diagnosis', max: 10, desc: '10: Tepat, 5: Kurang, 0: Tidak tepat' },
  { id: 'B2', label: 'Kesesuaian Prosedur Utama & Diagnosa Utama', max: 20, desc: '20: Sangat sesuai, 10: Cukup, 5: Tidak sesuai, 0: Salah' },
  { id: 'C1', section: 'C. Kesesuaian Dokumentasi', label: 'Kelengkapan Data dalam Resume', max: 10, desc: '10: Rangkum, 5: Minor terlewat, 0: Major terlewat' },
  { id: 'C2', label: 'Konsistensi dengan Laporan Tindakan', max: 10, desc: '10: Identik, 5: Minor beda, 0: Major beda' },
  { id: 'C3', label: 'Kesesuaian dengan Hasil Penunjang', max: 5, desc: '5: Konsisten, 0: Bertentangan' },
  { id: 'D1', section: 'D. Kelayakan Rawat Inap', label: 'Indikasi Rawat Inap', max: 15, desc: '15: Sangat jelas, 10: Kurang kuat, 0: Tdk ada indikasi' }
];

const QuizMpi1 = () => {
  const navigate = useNavigate();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize empty forms for all cases
  const [answers, setAnswers] = useState(() => {
    let initial = {};
    cases.forEach(c => {
      initial[c.id] = {
        identitas: { noRm: '', noSep: '', namaPasien: '', namaDpjp: '' },
        kuantitatif: {},
        kualitatif: {},
        rekomendasi: [{ diagnosa: '', hal: '' }],
        kesimpulan: ''
      };
      kuantitatifParams.forEach(p => initial[c.id].kuantitatif[p.id] = { skor: '', ket: '' });
      kualitatifParams.forEach(p => initial[c.id].kualitatif[p.id] = { skor: '', ket: '' });
    });
    return initial;
  });

  const { userData } = useAuth();

  const currentCase = cases[currentCaseIndex];
  const currentAnswers = answers[currentCase.id];

  const handleIdentitasChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentCase.id]: {
        ...prev[currentCase.id],
        identitas: { ...prev[currentCase.id].identitas, [field]: value }
      }
    }));
  };

  const handleScoreChange = (type, paramId, field, value) => {
    setAnswers(prev => ({
      ...prev,
      [currentCase.id]: {
        ...prev[currentCase.id],
        [type]: {
          ...prev[currentCase.id][type],
          [paramId]: { ...prev[currentCase.id][type][paramId], [field]: value }
        }
      }
    }));
  };

  const handleAddRekomendasi = () => {
    setAnswers(prev => {
      const caseAns = prev[currentCase.id];
      return {
        ...prev,
        [currentCase.id]: {
          ...caseAns,
          rekomendasi: [...caseAns.rekomendasi, { diagnosa: '', hal: '' }]
        }
      };
    });
  };

  const handleRekomendasiChange = (index, field, value) => {
    setAnswers(prev => {
      const caseAns = prev[currentCase.id];
      const newRekomendasi = [...caseAns.rekomendasi];
      newRekomendasi[index][field] = value;
      return {
        ...prev,
        [currentCase.id]: { ...caseAns, rekomendasi: newRekomendasi }
      };
    });
  };

  const handleRemoveRekomendasi = (index) => {
    setAnswers(prev => {
      const caseAns = prev[currentCase.id];
      const newRekomendasi = caseAns.rekomendasi.filter((_, i) => i !== index);
      return {
        ...prev,
        [currentCase.id]: { ...caseAns, rekomendasi: newRekomendasi }
      };
    });
  };

  const nextCase = () => {
    if (currentCaseIndex < cases.length - 1) setCurrentCaseIndex(currentCaseIndex + 1);
  };
  const prevCase = () => {
    if (currentCaseIndex > 0) setCurrentCaseIndex(currentCaseIndex - 1);
  };

  const handleFinalSubmit = async () => {
    if (!userData) {
      alert('Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }
    
    if (!window.confirm('Apakah Anda yakin ingin mensubmit seluruh analisis?')) return;

    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "scores"), {
        quizTitle: "Ujian Penugasan MPI 1 (Analisis RM)",
        participantName: userData.namaLengkap || userData.username || 'Unknown',
        instansi: userData.instansi || '-',
        kelompok: userData.kelompok || '-',
        score: "Pending",
        answers: answers,
        timestamp: serverTimestamp()
      });
      setIsFinished(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Terjadi kesalahan saat menyimpan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFinished) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 5rem)' }}>
        <div className="card" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem 2rem' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', margin: '0 auto 1.5rem' }} />
          <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>Tugas Selesai!</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Jawaban Analisis Rekam Medis MPI 1 Anda telah dikirim dan menunggu review Fasilitator.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/penugasan')}>
            Kembali ke Workspace Penugasan
          </button>
        </div>
      </div>
    );
  }

  const renderTable = (params, type) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '0.9rem' }}>
      <thead>
        <tr style={{ backgroundColor: '#f1f5f9' }}>
          <th style={{ border: '1px solid #cbd5e1', padding: '0.8rem', textAlign: 'left' }}>No</th>
          <th style={{ border: '1px solid #cbd5e1', padding: '0.8rem', textAlign: 'left' }}>Komponen Penilaian</th>
          <th style={{ border: '1px solid #cbd5e1', padding: '0.8rem', textAlign: 'center', width: '100px' }}>Skor</th>
          <th style={{ border: '1px solid #cbd5e1', padding: '0.8rem', textAlign: 'left' }}>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p) => (
          <React.Fragment key={p.id}>
            {p.section && (
              <tr style={{ backgroundColor: '#e2e8f0', fontWeight: 'bold' }}>
                <td colSpan="4" style={{ border: '1px solid #cbd5e1', padding: '0.6rem' }}>{p.section}</td>
              </tr>
            )}
            <tr>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem', textAlign: 'center' }}>{p.id}</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem' }}>
                <div style={{ fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.desc}</div>
              </td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem' }}>
                <input 
                  type="number" 
                  min="0" 
                  max={p.max} 
                  value={currentAnswers[type][p.id].skor}
                  onChange={(e) => handleScoreChange(type, p.id, 'skor', e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px', textAlign: 'center' }}
                />
              </td>
              <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem' }}>
                <input 
                  type="text" 
                  value={currentAnswers[type][p.id].ket}
                  onChange={(e) => handleScoreChange(type, p.id, 'ket', e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 5rem)' }}>
      {/* Left Panel - PDF Viewer */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--color-border)', backgroundColor: '#f1f5f9' }}>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaFilePdf style={{ color: '#ef4444', fontSize: '1.2rem' }} />
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Referensi Soal - {currentCase.title}</h2>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          {currentCase.pdfUrl ? (
            <iframe 
              src={`${currentCase.pdfUrl}#view=FitH`} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              title={`Soal ${currentCase.title}`}
            />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>PDF Tidak Tersedia</div>
          )}
        </div>
      </div>

      {/* Right Panel - Evaluasi Form */}
      <div style={{ width: '55%', overflowY: 'auto', backgroundColor: '#fafafa', position: 'relative' }}>
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.5rem' }}>Analisis Resume Medis ({currentCase.title})</h2>
            <div style={{ color: '#64748b', fontWeight: 600 }}>Kasus {currentCaseIndex + 1} / {cases.length}</div>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Identitas Pasien</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>No Rekam Medis</label>
                <input type="text" value={currentAnswers.identitas.noRm} onChange={(e) => handleIdentitasChange('noRm', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>No SEP</label>
                <input type="text" value={currentAnswers.identitas.noSep} onChange={(e) => handleIdentitasChange('noSep', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Nama Pasien</label>
                <input type="text" value={currentAnswers.identitas.namaPasien} onChange={(e) => handleIdentitasChange('namaPasien', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Nama DPJP</label>
                <input type="text" value={currentAnswers.identitas.namaDpjp} onChange={(e) => handleIdentitasChange('namaDpjp', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>I. ANALISIS KUANTITATIF (Administratif)</h3>
            {renderTable(kuantitatifParams, 'kuantitatif')}
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>II. ANALISIS KUALITATIF (Kesesuaian Klinis)</h3>
            {renderTable(kualitatifParams, 'kualitatif')}
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Rekomendasi Konfirmasi ke DPJP</h3>
            {currentAnswers.rekomendasi.map((rek, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <input type="text" placeholder="Nama Diagnosa/Tindakan" value={rek.diagnosa} onChange={(e) => handleRekomendasiChange(idx, 'diagnosa', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '0.5rem' }} />
                </div>
                <div style={{ flex: 2 }}>
                  <input type="text" placeholder="Hal yang perlu dikonfirmasi" value={rek.hal} onChange={(e) => handleRekomendasiChange(idx, 'hal', e.target.value)} style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <button onClick={() => handleRemoveRekomendasi(idx)} style={{ padding: '0.6rem', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <button onClick={handleAddRekomendasi} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', color: '#3b82f6', backgroundColor: '#eff6ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
              <FaPlus /> Tambah Rekomendasi
            </button>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Kesimpulan Akhir</h3>
            <select 
              value={currentAnswers.kesimpulan} 
              onChange={(e) => setAnswers(prev => ({...prev, [currentCase.id]: {...prev[currentCase.id], kesimpulan: e.target.value}}))}
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            >
              <option value="">-- Pilih Kesimpulan --</option>
              <option value="Layak Klaim">Layak Klaim</option>
              <option value="Perlu Koreksi">Perlu Koreksi</option>
              <option value="Tidak Layak">Tidak Layak</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-outline" onClick={prevCase} disabled={currentCaseIndex === 0} style={{ opacity: currentCaseIndex === 0 ? 0.5 : 1 }}>
              <FaArrowLeft /> Kasus Sebelumnya
            </button>

            {currentCaseIndex === cases.length - 1 ? (
              <button className="btn btn-primary" style={{ flex: 1, backgroundColor: '#059669', borderColor: '#059669' }} onClick={handleFinalSubmit} disabled={isSubmitting}>
                <FaCheckCircle /> {isSubmitting ? 'Menyimpan...' : 'Simpan Seluruh Analisis MPI 1'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={nextCase}>
                Kasus Selanjutnya <FaArrowRight />
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default QuizMpi1;
