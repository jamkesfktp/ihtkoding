import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [editCount, setEditCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { userData } = useAuth();
  
  useEffect(() => {
    const fetchSubmission = async () => {
      if (!userData || !userData.uid) {
        setIsLoadingData(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, "scores"), 
          where("userId", "==", userData.uid),
          where("quizTitle", "==", "Ujian Koding Dasar")
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setSubmissionId(docData.id);
          const data = docData.data();
          if (data.answers) setAnswers(data.answers);
          setEditCount(data.editCount || 0);
          
          if ((data.editCount || 0) >= 1) {
            setIsFinished(true); // Langsung tunjukkan layar sukses jika sudah mentok
          }
        }
      } catch (error) {
        console.error("Error fetching previous submission:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchSubmission();
  }, [userData]);

  const handleOptionSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = async () => {
    if (!userData) {
      alert('Sesi Anda telah berakhir, silakan login kembali.');
      return;
    }
    
    if (Object.keys(answers).length < quizQuestions.length) {
      if (!window.confirm('Anda belum menjawab semua soal. Yakin ingin mengakhiri?')) {
        return;
      }
    } else {
      if (!window.confirm(submissionId ? 'Anda yakin ingin mengubah jawaban? Kesempatan edit hanya 1x.' : 'Apakah Anda yakin ingin mensubmit semua jawaban?')) {
        return;
      }
    }
    
    if (editCount >= 1 && submissionId) {
      alert('Anda telah menggunakan kesempatan edit 1x. Jawaban Anda sudah dikunci.');
      return;
    }

    setIsSubmitting(true);
    const result = calculateScore();

    try {
      if (submissionId) {
        await updateDoc(doc(db, "scores", submissionId), {
          score: result.score,
          answers: answers,
          editCount: editCount + 1,
          lastEdited: serverTimestamp()
        });
        setEditCount(editCount + 1);
      } else {
        const docRef = await addDoc(collection(db, "scores"), {
          userId: userData.uid,
          quizTitle: "Ujian Koding Dasar",
          participantName: userData.namaLengkap || userData.username || 'Unknown',
          instansi: userData.instansi || '-',
          kelompok: userData.kelompok || '-',
          score: result.score,
          answers: answers,
          editCount: 0,
          timestamp: serverTimestamp()
        });
        setSubmissionId(docRef.id);
      }
      setIsFinished(true);
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    return {
      correct,
      total: quizQuestions.length,
      score: Math.round((correct / quizQuestions.length) * 100)
    };
  };

  if (isFinished) {
    const result = calculateScore();
    return (
      <div className="page-container" style={{ padding: '4rem 1.5rem', backgroundColor: '#f8fafc' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#10b981', margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>{editCount >= 1 ? 'Jawaban Terkunci!' : 'Hasil Ujian Koding'}</h2>
          
          {!submissionId || editCount >= 1 ? (
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
              Anda telah menggunakan batas pengubahan 1x. Jawaban Anda telah dikunci dan tidak bisa diubah lagi.
            </p>
          ) : null}

          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>
            {result.score}
          </div>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Anda menjawab benar <strong>{result.correct}</strong> dari <strong>{result.total}</strong> soal.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/soal')}>
            Kembali ke Halaman Soal
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="page-container" style={{ padding: '2rem 1.5rem', backgroundColor: '#f1f5f9', minHeight: 'calc(100vh - 5rem)' }}>
      <div className="container" style={{ maxWidth: '1000px', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Sidebar Navigasi Soal */}
        <div className="card" style={{ width: '280px', flexShrink: 0, padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Navigasi Soal</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {quizQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = currentQuestion === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    backgroundColor: isCurrent ? 'var(--color-primary)' : isAnswered ? '#10b981' : '#e2e8f0',
                    color: (isCurrent || isAnswered) ? 'white' : '#475569',
                    transition: 'all 0.2s'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '4px' }}></div> Sudah Dijawab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div> Belum Dijawab
            </div>
          </div>
        </div>

        {/* Area Soal */}
        <div className="card" style={{ flex: 1, padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-secondary)' }}>Soal No. {currentQuestion + 1}</h2>
          </div>

          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6, fontWeight: 500 }}>
            {currentQ.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {currentQ.options.map((option, idx) => (
              <label 
                key={idx} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', 
                  border: '2px solid',
                  borderColor: answers[currentQuestion] === option ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: answers[currentQuestion] === option ? 'var(--color-primary-light)' : 'transparent',
                  borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s',
                  fontWeight: answers[currentQuestion] === option ? 600 : 400
                }}
              >
                <input 
                  type="radio" 
                  name={`q${currentQuestion}`} 
                  value={option} 
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={editCount >= 1 || isLoadingData}
                  style={{ transform: 'scale(1.2)' }}
                />
                {option}
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--color-border)', paddingTop: '1.5rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={prevQuestion} 
              disabled={currentQuestion === 0}
              style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
            >
              <FaArrowLeft /> Sebelumnya
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button className="btn btn-primary" onClick={finishQuiz} disabled={isSubmitting || isLoadingData} style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}>
                <FaCheckCircle /> {isLoadingData ? 'Memuat...' : isSubmitting ? 'Menyimpan...' : submissionId ? 'Update Jawaban (Sisa Edit: 1x)' : 'Selesai & Lihat Hasil'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={nextQuestion}>
                Selanjutnya <FaArrowRight />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Quiz;
