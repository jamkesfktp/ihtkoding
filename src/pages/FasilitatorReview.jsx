import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUserShield, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

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
      // Filter only manual scored quizzes
      const manualQuizzes = data.filter(d => 
        d.quizTitle?.includes("MPI 1") || 
        d.quizTitle?.includes("MPI 4") || 
        d.quizTitle?.includes("MPI 5")
      );
      setSubmissions(manualQuizzes);
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
                  <summary style={{ fontWeight: 'bold', color: '#2563eb' }}>Lihat Skor Lengkap (Kuantitatif & Kualitatif)</summary>
                  <pre style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '6px', overflowX: 'auto', marginTop: '0.5rem' }}>
                    {JSON.stringify({ kuantitatif: data.kuantitatif, kualitatif: data.kualitatif }, null, 2)}
                  </pre>
                </details>
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
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Review penugasan manual (MPI 1, MPI 4, MPI 5) dan berikan skor.</p>
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
