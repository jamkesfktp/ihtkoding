import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft, FaArrowRight, FaFilePdf, FaExclamationTriangle, FaTimes, FaSave } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { quizDataMpi2 } from '../data/quizDataMpi2';

const QuizCaseStudy = ({ quizData = quizDataMpi2 }) => {
  const navigate = useNavigate();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextCase = () => {
    if (currentCaseIndex < quizData.cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
    }
  };

  const prevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex(currentCaseIndex - 1);
    }
  };

  const getTotalQuestions = () => {
    return quizData.cases.reduce((total, c) => total + c.questions.length, 0);
  };

  const handleFinalSubmit = async () => {
    if (!userData) {
      alert('Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Hitung Skor
      let calculatedScore = 0;
      
      if (quizData.isManualScore) {
        calculatedScore = "Pending";
      } else {
        let isNumericQuiz = quizData.cases.some(c => c.questions.some(q => q.type === 'number'));

        if (isNumericQuiz) {
          let totalSum = 0;
          quizData.cases.forEach(c => {
            c.questions.forEach(q => {
              if (q.type === 'number') {
                totalSum += parseInt(answers[q.id]) || 0;
              }
            });
          });
          calculatedScore = Math.round(totalSum / quizData.cases.length);
        } else {
          let correctCount = 0;
          let totalQuestions = getTotalQuestions();

          quizData.cases.forEach(c => {
            c.questions.forEach(q => {
              // Evaluasi jawaban (bisa handle string maupun array untuk multi-jawaban)
              let isCorrect = false;
              let userAnswer = (answers[q.id] || '').toString().replace(/\s+/g, '').toUpperCase();
              
              if (Array.isArray(q.answer)) {
                isCorrect = q.answer.some(ans => ans.toString().replace(/\s+/g, '').toUpperCase() === userAnswer);
              } else if (q.answer) {
                isCorrect = (userAnswer === q.answer.toString().replace(/\s+/g, '').toUpperCase());
              }

              if (isCorrect) correctCount++;
            });
          });

          calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
        }
      }

      await addDoc(collection(db, "scores"), {
        quizTitle: quizData.title,
        participantName: userData.namaLengkap || userData.username || 'Unknown',
        instansi: userData.instansi || '-',
        kelompok: userData.kelompok || '-',
        score: calculatedScore,
        answers: answers,
        timestamp: serverTimestamp()
      });

      alert(`Sukses! Nilai Anda (${calculatedScore}) telah disimpan.`);
      navigate('/leaderboard');
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishQuiz = () => {
    const totalQ = getTotalQuestions();
    const answeredCount = Object.keys(answers).filter(k => answers[k] && answers[k].trim() !== '').length;
    
    if (answeredCount < totalQ) {
      if (!window.confirm(`Anda baru menjawab ${answeredCount} dari ${totalQ} soal. Yakin ingin mengakhiri dan mensubmit jawaban?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Apakah Anda yakin ingin submit semua jawaban?`)) {
        return;
      }
    }
    handleFinalSubmit();
  };

  if (isFinished) {
    return (
      <div className="page-container" style={{ padding: '4rem 1.5rem', backgroundColor: '#f8fafc' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Hasil Ujian {quizData.title}</h2>
          <button className="btn btn-primary" onClick={() => navigate('/penugasan')}>
            Kembali ke Halaman Penugasan
          </button>
        </div>
      </div>
    );
  }

  const currentCase = quizData.cases[currentCaseIndex];

  return (
    <div className="page-container" style={{ padding: '1rem', backgroundColor: '#f1f5f9', minHeight: 'calc(100vh - 5rem)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary)' }}>{quizData.title}</h1>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>Pastikan Anda membaca Ketentuan Pengisian sebelum menjawab.</p>
          </div>
      </div>

      {/* Ketentuan Pengisian Alert */}
      <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: '#b45309', marginBottom: '0.5rem' }}>
          <FaExclamationTriangle /> KETENTUAN PENGISIAN
        </div>
        <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap', color: '#92400e' }}>
          {quizData.description}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: '90vh' }}>
        {/* Left Side: PDF Viewer */}
        {currentCase.pdfUrl && (
          <div className="card" style={{ flex: '1 1 60%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', backgroundColor: '#e2e8f0', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaFilePdf style={{ color: '#ef4444' }}/>
              <strong style={{ color: '#334155' }}>Referensi Rekam Medis - {currentCase.title}</strong>
            </div>
            <iframe 
              src={`${currentCase.pdfUrl}#view=FitH&toolbar=0`} 
              style={{ width: '100%', height: '100%', minHeight: '800px', border: 'none', flex: 1 }} 
              title="PDF Viewer"
            />
          </div>
        )}

        {/* Right Side: Quiz Form */}
        <div className="card" style={{ flex: '1 1 40%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
             {quizData.cases.map((c, idx) => {
                const isAnswered = c.questions.some(q => answers[q.id] && answers[q.id].trim() !== '');
                const isCurrent = currentCaseIndex === idx;
                
                return (
                  <div 
                    key={idx}
                    onClick={() => setCurrentCaseIndex(idx)}
                    title={c.title}
                    style={{
                      width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                      backgroundColor: isCurrent ? 'var(--color-primary)' : (isAnswered ? '#10b981' : '#e2e8f0'),
                      color: (isCurrent || isAnswered) ? '#fff' : '#475569',
                      transition: 'all 0.2s'
                    }}
                  >
                    {idx + 1}
                  </div>
                )
             })}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--color-secondary)', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                {currentCase.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {currentCase.questions.map((q, index) => (
                  <div key={q.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155', lineHeight: '1.5' }}>
                      {index + 1}. {q.label}
                    </label>
                    {q.type === 'textarea' ? (
                      <textarea
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px', minHeight: '150px' }}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Ketik jawaban Anda di sini..."
                      />
                    ) : q.type === 'radio' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                        {q.options.map((opt, optIndex) => (
                          <label key={optIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', color: '#475569', lineHeight: '1.4' }}>
                            <input 
                              type="radio" 
                              name={q.id} 
                              value={opt} 
                              checked={answers[q.id] === opt} 
                              onChange={(e) => handleInputChange(q.id, e.target.value)}
                              style={{ marginTop: '0.2rem' }}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input 
                        type={q.type || "text"} 
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder={q.type === 'number' ? "0" : "Ketik jawaban di sini..."}
                        style={{ 
                          width: '100%', padding: '0.8rem 1rem', fontSize: '1rem', 
                          border: '2px solid var(--color-border)', borderRadius: '0.5rem',
                          outline: 'none', transition: 'border-color 0.2s',
                          textTransform: (q.uppercase === false || q.type === 'number') ? 'none' : 'uppercase'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    )}
                  </div>
                ))}
              </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={prevCase} 
              disabled={currentCaseIndex === 0}
              style={{ opacity: currentCaseIndex === 0 ? 0.5 : 1 }}
            >
              <FaArrowLeft /> Kasus Sebelumnya
            </button>

            {currentCaseIndex === quizData.cases.length - 1 ? (
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: '#059669', borderColor: '#059669' }}
                onClick={finishQuiz}
              >
                <FaCheckCircle /> Finalisasi & Submit Jawaban 
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

export default QuizCaseStudy;
