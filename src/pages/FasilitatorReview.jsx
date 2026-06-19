import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUserShield, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { answerKeyMpi1 } from '../data/answerKeyMpi1';
import { quizDataMpi2 } from '../data/quizDataMpi2';
import { quizDataMpi3 } from '../data/quizDataMpi3';
import { quizDataMpi4 } from '../data/quizDataMpi4';
import { quizDataPreTest } from '../data/quizDataPreTest';
import { quizDataPostTest } from '../data/quizDataPostTest';

const FasilitatorReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [inputScore, setInputScore] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const q = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Tampilkan semua data ujian tanpa filter
      setSubmissions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateScore = async () => {
    if (!inputScore || isNaN(inputScore)) {
      alert("Masukkan angka yang valid (0-100)");
      return;
    }
    setIsUpdating(true);
    try {
      const scoreRef = doc(db, "scores", selectedSub.id);
      await updateDoc(scoreRef, {
        score: parseInt(inputScore, 10)
      });
      alert("Skor berhasil diperbarui!");
      setSelectedSub(null);
      setInputScore('');
    } catch (error) {
      console.error("Error updating score: ", error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getAnswerDetails = (quizTitle, key, userAnswer) => {
    let quizData = null;
    if (quizTitle.includes("MPI 2") || quizTitle.includes("MPI-2")) quizData = quizDataMpi2;
    else if (quizTitle.includes("MPI 3") || quizTitle.includes("MPI-3")) quizData = quizDataMpi3;
    else if (quizTitle.includes("MPI 4") || quizTitle.includes("MPI-4")) quizData = quizDataMpi4;
    else if (quizTitle.includes("Pre-Test")) quizData = quizDataPreTest;
    else if (quizTitle.includes("Post-Test")) quizData = quizDataPostTest;

    if (!quizData || !quizData.cases) return null;

    for (const c of quizData.cases) {
      if (!c.questions) continue;
      const q = c.questions.find(q => q.id === key);
      if (q) {
        let displayStr = '';
        let scoreFraction = 0;
        const uAns = (userAnswer || '').toString().toUpperCase();

        if (quizTitle.includes("MPI 4") && c.keywords) {
          displayStr = c.keywords.join(' ATAU ');
          scoreFraction = c.keywords.some(kw => uAns.includes(kw.toUpperCase())) ? 1 : 0;
        } else if (quizTitle.includes("Pre-Test") || quizTitle.includes("Post-Test")) {
          displayStr = q.answer;
          scoreFraction = (userAnswer === q.answer) ? 1 : 0;
        } else {
          // MPI 2 & 3
          displayStr = Array.isArray(q.answer) ? q.answer.join(' ATAU ') : (q.answer || '-');
          
          const checkAns = (expectedAnsStr) => {
            if (expectedAnsStr === "-") {
              const cleanUserAns = uAns.replace(/[^A-Z0-9-]/g, '');
              if (cleanUserAns === "" || cleanUserAns === "-" || uAns.includes("TIDAK ADA") || uAns.includes("KOSONG") || uAns.includes("TIDAK")) return 1;
              return 0;
            }
            const requiredCodes = expectedAnsStr.split(';').map(x => x.trim().toUpperCase());
            let matches = 0;
            requiredCodes.forEach(code => {
              const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const regex = new RegExp(escapedCode + '(?!\\.|\\d)', 'i');
              if (regex.test(uAns)) matches++;
            });
            return matches / requiredCodes.length;
          };

          if (Array.isArray(q.answer)) {
            scoreFraction = Math.max(...q.answer.map(ans => checkAns(ans.toString())));
          } else {
            scoreFraction = checkAns((q.answer || '').toString());
          }
        }

        return { displayStr, scoreFraction };
      }
    }
    return null;
  };

  const renderAnswers = (answers, quizTitle) => {
    if (!answers) return <p>Tidak ada jawaban tersimpan.</p>;

    if (quizTitle.includes("MPI 5")) {
      return (
        <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <strong>Link Google Slides:</strong> <br/>
          <a href={answers.linkSlide} target="_blank" rel="noreferrer" style={{ color: '#2563eb', wordBreak: 'break-all' }}>
            {answers.linkSlide}
          </a>
        </div>
      );
    }

    if (quizTitle.includes("MPI 4")) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(answers).map(([key, val]) => (
            <div key={key} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <strong>Kasus/Pertanyaan {key}:</strong>
              <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', color: '#475569' }}>{val}</p>
            </div>
          ))}
        </div>
      );
    }

    if (quizTitle.includes("MPI 1")) {
      const kuantitatifParams = [
        { id: 'A1', label: 'Kesesuaian Tanggal' },
        { id: 'B1', label: 'Identitas Pasien Lengkap' },
        { id: 'B2', label: 'Tanggal & Jam Masuk/Keluar' },
        { id: 'B3', label: 'Anamnesis & Kondisi Saat Masuk' },
        { id: 'B4', label: 'Diagnosa Utama & Sekunder' },
        { id: 'B5', label: 'Prosedur/Tindakan Medis' },
        { id: 'B6', label: 'Pengobatan & Tatalaksana' },
        { id: 'B7', label: 'Hasil Pemeriksaan Penunjang' },
        { id: 'B8', label: 'Kondisi & Rencana Saat Pulang' },
        { id: 'B9', label: 'Autentikasi DPJP (Nama & TTD)' },
        { id: 'B10', label: 'Tanggal Pembuatan Resume' },
        { id: 'C1', label: 'Surat Keterangan Meninggal*' },
        { id: 'C2', label: 'Laporan Operasi/Tindakan' },
        { id: 'C3', label: 'Informed Consent*' }
      ];

      const kualitatifParams = [
        { id: 'A1', label: 'Diagnosa Utama vs Temuan Klinis' },
        { id: 'A2', label: 'Diagnosa Sekunder vs Komorbid' },
        { id: 'A3', label: 'Urutan Penulisan Diagnosa' },
        { id: 'B1', label: 'Pengobatan dengan Diagnosis' },
        { id: 'B2', label: 'Prosedur Utama & Diagnosa Utama' },
        { id: 'C1', label: 'Kelengkapan Data dalam Resume' },
        { id: 'C2', label: 'Konsistensi dengan Laporan Tindakan' },
        { id: 'C3', label: 'Kesesuaian dengan Hasil Penunjang' },
        { id: 'D1', label: 'Indikasi Rawat Inap' }
      ];

      const renderScoreTable = (scoreData, title, caseId, type) => {
        if (!scoreData || Object.keys(scoreData).length === 0) return null;
        
        const params = title.includes("Kuantitatif") ? kuantitatifParams : kualitatifParams;

        return (
          <div style={{ marginTop: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#334155', fontSize: '0.95rem' }}>{title}</h5>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'left' }}>Item Evaluasi</th>
                  <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'center', width: '80px' }}>Skor</th>
                  <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'center', width: '80px' }}>Kunci</th>
                  <th style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'left' }}>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(scoreData).map(([key, val]) => {
                  const paramDef = params.find(p => p.id === key);
                  const label = paramDef ? paramDef.label : key;

                  return (
                    <tr key={key}>
                      <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', color: '#475569' }}>
                        <strong>{key}</strong> - {label}
                      </td>
                      <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'center' }}>
                        <span style={{ 
                          backgroundColor: val.skor ? '#dcfce7' : '#fee2e2', 
                          color: val.skor ? '#166534' : '#991b1b',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 'bold'
                        }}>{val.skor || '0'}</span>
                      </td>
                      <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', textAlign: 'center', color: '#16a34a', fontWeight: 'bold' }}>
                        {answerKeyMpi1[caseId]?.[type]?.[key] || '-'}
                      </td>
                      <td style={{ border: '1px solid #cbd5e1', padding: '0.5rem', color: '#334155' }}>{val.ket || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      };

      // Rekap skor dari JSON structure
      return (
        <div style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
          {Object.entries(answers).map(([caseId, data]) => {
            if (typeof data !== 'object') return null;
            return (
              <div key={caseId} style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Kasus {caseId}</h4>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Kesimpulan:</strong> <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{data.kesimpulan || 'Tidak diisi'}</span>
                </div>
                
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Rekomendasi DPJP:</strong>
                  <ul style={{ margin: '0.2rem 0 0 1.5rem', fontSize: '0.9rem' }}>
                    {data.rekomendasi?.map((r, i) => (
                      <li key={i}>{r.diagnosa} - {r.hal}</li>
                    ))}
                  </ul>
                </div>

                <details style={{ marginTop: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <summary style={{ fontWeight: 'bold', color: '#2563eb', padding: '0.5rem 0' }}>Lihat Skor Lengkap (Kuantitatif & Kualitatif)</summary>
                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '0.5rem' }}>
                    {renderScoreTable(data.kuantitatif, "Penilaian Kuantitatif", caseId, "kuantitatif")}
                    {renderScoreTable(data.kualitatif, "Penilaian Kualitatif", caseId, "kualitatif")}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      );
    }
    
    if (quizTitle.includes("MPI 5") && answers.linkSlide) {
      return (
        <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h4 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Link Presentasi Google Slides:</h4>
          <a href={answers.linkSlide} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', wordBreak: 'break-all' }}>
            {answers.linkSlide}
          </a>
        </div>
      );
    }

    if (typeof answers === 'object') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(answers).map(([key, val]) => {
            if (typeof val === 'object') return null; // Skip complex objects like MPI 1
            const answerDetails = getAnswerDetails(quizTitle, key, val);
            
            return (
              <div key={key} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Soal / Item {key}:</strong>
                  {answerDetails && (
                    answerDetails.scoreFraction === 1 ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#166534', backgroundColor: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        <FaCheck /> BENAR (Skor: 1)
                      </span>
                    ) : answerDetails.scoreFraction > 0 ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#b45309', backgroundColor: '#fef3c7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        <FaCheck /> BENAR SEBAGIAN (Skor: {answerDetails.scoreFraction.toFixed(2)})
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#991b1b', backgroundColor: '#fee2e2', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        <FaTimes /> SALAH (Skor: 0)
                      </span>
                    )
                  )}
                </div>
                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', color: '#475569', fontWeight: 600 }}>{val}</p>
                {answerDetails && (
                  <div style={{ marginTop: '0.8rem', padding: '0.5rem', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '4px', fontSize: '0.9rem' }}>
                    <strong>Kunci Jawaban:</strong> {answerDetails.displayStr}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return <pre>{JSON.stringify(answers, null, 2)}</pre>;
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'Pending') return s.score === 'Pending';
    if (filter === 'Scored') return s.score !== 'Pending';
    return true;
  });

  return (
    <div className="page-container" style={{ padding: '2rem 1rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 5rem)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <FaUserShield /> Dashboard Fasilitator
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Review penugasan manual dan lihat seluruh jawaban peserta.</p>
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontWeight: 600, color: '#334155' }}
          >
            <option value="All">Semua Data</option>
            <option value="Pending">Menunggu Review (Pending)</option>
            <option value="Scored">Sudah Dinilai</option>
          </select>
        </div>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#1e293b', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem' }}>Waktu Submit</th>
                  <th style={{ padding: '1rem' }}>Nama Peserta</th>
                  <th style={{ padding: '1rem' }}>Kelompok</th>
                  <th style={{ padding: '1rem' }}>Penugasan</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Skor</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Memuat data...</td></tr>
                ) : filteredSubmissions.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Tidak ada data yang ditemukan.</td></tr>
                ) : (
                  filteredSubmissions.map(sub => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: sub.score === 'Pending' ? '#fffbeb' : 'white' }}>
                      <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                        {sub.timestamp ? new Date(sub.timestamp.toDate()).toLocaleString('id-ID') : '-'}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>{sub.participantName}</td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{sub.kelompok || '-'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', color: '#2563eb', fontWeight: 600 }}>{sub.quizTitle}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        {sub.score === 'Pending' ? (
                          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>Pending</span>
                        ) : (
                          <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>{sub.score}</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => { setSelectedSub(sub); setInputScore(sub.score === 'Pending' ? '' : sub.score); }}
                          style={{ backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem' }}
                        >
                          <FaSearch /> Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal Review */}
      {selectedSub && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '800px', borderRadius: '8px', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: '8px 8px 0 0' }}>
              <div>
                <h3 style={{ margin: 0, color: '#0f172a' }}>Review Penugasan: {selectedSub.participantName}</h3>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.3rem' }}>{selectedSub.quizTitle} | Kelompok: {selectedSub.kelompok}</div>
              </div>
              <button onClick={() => setSelectedSub(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#94a3b8', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <h4 style={{ marginBottom: '1rem', color: '#334155' }}>Jawaban Peserta:</h4>
              {renderAnswers(selectedSub.answers, selectedSub.quizTitle)}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', borderRadius: '0 0 8px 8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>Input / Update Skor (0-100)</label>
                <input 
                  type="number" 
                  value={inputScore}
                  onChange={(e) => setInputScore(e.target.value)}
                  placeholder="Masukkan angka 0-100"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                <button onClick={() => setSelectedSub(null)} className="btn btn-outline" style={{ padding: '0.8rem 1.5rem' }} disabled={isUpdating}>Tutup</button>
                <button onClick={handleUpdateScore} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#10b981', borderColor: '#10b981' }} disabled={isUpdating}>
                  {isUpdating ? 'Menyimpan...' : 'Simpan Skor'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FasilitatorReview;
