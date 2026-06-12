import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FaUserCog, FaDownload, FaTable } from 'react-icons/fa';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const downloadCSV = () => {
    if (submissions.length === 0) {
      alert("Tidak ada data untuk diunduh.");
      return;
    }

    // Header CSV
    let csvContent = "Waktu Submit,Nama Peserta,Instansi,Kelompok,Penugasan,Skor\n";

    // Data Rows
    submissions.forEach(sub => {
      const waktu = sub.timestamp ? new Date(sub.timestamp.toDate()).toLocaleString('id-ID') : '-';
      const nama = `"${sub.participantName || '-'}"`;
      const instansi = `"${sub.instansi || '-'}"`;
      const kelompok = `"${sub.kelompok || '-'}"`;
      const tugas = `"${sub.quizTitle || '-'}"`;
      const skor = `"${sub.score || '-'}"`;
      
      csvContent += `${waktu},${nama},${instansi},${kelompok},${tugas},${skor}\n`;
    });

    // Buat file Blob dan trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Peserta_Pelatihan_Koding_${new Date().toLocaleDateString('id-ID')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container" style={{ padding: '2rem 1rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <FaUserCog /> Dashboard Admin
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Pantau seluruh data peserta dan riwayat submit penugasan.</p>
          </div>
          
          <button 
            onClick={downloadCSV}
            className="btn btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#059669', borderColor: '#059669' }}
          >
            <FaDownload /> Download Data (CSV/Excel)
          </button>
        </div>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#334155' }}>
            <FaTable /> Tabel Riwayat Pengumpulan Tugas Terlengkap
          </div>
          <div style={{ overflowX: 'auto', maxHeight: '60vh' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#1e293b', color: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ padding: '1rem' }}>Waktu Submit</th>
                  <th style={{ padding: '1rem' }}>Nama Peserta</th>
                  <th style={{ padding: '1rem' }}>Instansi</th>
                  <th style={{ padding: '1rem' }}>Kelompok</th>
                  <th style={{ padding: '1rem' }}>Penugasan</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Skor Akhir</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Memuat data...</td></tr>
                ) : submissions.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Belum ada data pengumpulan.</td></tr>
                ) : (
                  submissions.map(sub => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
                      <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                        {sub.timestamp ? new Date(sub.timestamp.toDate()).toLocaleString('id-ID') : '-'}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>{sub.participantName || '-'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>{sub.instansi || '-'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>{sub.kelompok || '-'}</td>
                      <td style={{ padding: '1rem', fontSize: '0.95rem', color: '#2563eb', fontWeight: 600 }}>{sub.quizTitle || '-'}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        {sub.score === 'Pending' ? (
                          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>Pending</span>
                        ) : (
                          <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>{sub.score}</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
