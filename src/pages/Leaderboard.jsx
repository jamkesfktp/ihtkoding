import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FaTrophy, FaMedal, FaSpinner } from 'react-icons/fa';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setScores(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Aggregation per participant
  const aggregatedScores = scores.reduce((acc, curr) => {
    const name = curr.participantName;
    if (!acc[name]) {
      acc[name] = { 
        name, 
        preTest: 0, 
        mpi1: 0, 
        mpi2: 0, 
        mpi3: 0, 
        mpi4: 0, 
        postTest: 0, 
        total: 0 
      };
    }
    
    // Map title to column
    const title = curr.quizTitle.toLowerCase();
    let score = curr.score || 0;
    
    if (title.includes('pre')) acc[name].preTest = score;
    else if (title.includes('mpi 1') || title.includes('mpi-1')) acc[name].mpi1 = score;
    else if (title.includes('mpi 2') || title.includes('mpi-2')) acc[name].mpi2 = score;
    else if (title.includes('mpi 3') || title.includes('mpi-3')) acc[name].mpi3 = score;
    else if (title.includes('mpi 4') || title.includes('mpi-4')) acc[name].mpi4 = score;
    else if (title.includes('post')) acc[name].postTest = score;

    acc[name].total = acc[name].preTest + acc[name].mpi1 + acc[name].mpi2 + acc[name].mpi3 + acc[name].mpi4 + acc[name].postTest;

    return acc;
  }, {});

  const rankedScores = Object.values(aggregatedScores).sort((a, b) => b.total - a.total);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--color-primary)' }}>
        <FaSpinner className="spin" size="3rem" />
        <h2 style={{ marginLeft: '1rem' }}>Memuat Data Leaderboard...</h2>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: '2rem 1rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 5rem)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <FaTrophy style={{ color: '#fbbf24' }} /> Papan Peringkat Peserta
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Rekapitulasi Nilai Secara Keseluruhan (Real-time)
          </p>
        </div>

        <div className="card" style={{ overflowX: 'auto', padding: '0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Rank</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0' }}>Nama Kelompok / Peserta</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Pre-Test</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>MPI 1</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>MPI 2</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>MPI 3</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>MPI 4</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center' }}>Post-Test</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #e2e8f0', textAlign: 'center', backgroundColor: '#0369a1' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {rankedScores.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    Belum ada data ujian yang disubmit.
                  </td>
                </tr>
              ) : (
                rankedScores.map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                      {index === 0 ? <FaMedal style={{ color: '#fbbf24', fontSize: '1.5rem' }} /> : 
                       index === 1 ? <FaMedal style={{ color: '#94a3b8', fontSize: '1.5rem' }} /> : 
                       index === 2 ? <FaMedal style={{ color: '#b45309', fontSize: '1.5rem' }} /> : 
                       index + 1}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#334155' }}>{row.name}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.preTest}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.mpi1}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.mpi2}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.mpi3}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.mpi4}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{row.postTest}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: '#0ea5e9' }}>
                      {row.total}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
