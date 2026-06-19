import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft, FaArrowRight, FaFilePdf, FaExclamationTriangle, FaTimes, FaSave } from 'react-icons/fa';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { quizDataMpi2 } from '../data/quizDataMpi2';

const QuizCaseStudy = ({ quizData = quizDataMpi2 }) => {
  const navigate = useNavigate();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [editCount, setEditCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [leftWidth, setLeftWidth] = useState(60);
  const isResizing = React.useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth >= 20 && newWidth <= 80) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = 'default';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
          where("quizTitle", "==", quizData.title)
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
  }, [userData, quizData.title]);

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
    
    if (editCount >= 1 && submissionId) {
      alert('Anda telah menggunakan kesempatan edit 1x. Jawaban Anda sudah dikunci.');
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
            if (c.keywords && c.keywords.length > 0) {
              // Penilaian berbasis keyword untuk MPI 4 dsb
              let caseCorrect = false;
              c.questions.forEach(q => {
                let userAnswer = (answers[q.id] || '').toString().toUpperCase();
                if (c.keywords.some(kw => userAnswer.includes(kw.toUpperCase()))) {
                  caseCorrect = true;
                }
              });
              if (caseCorrect) correctCount += c.questions.length; // anggap semua pertanyaan di kasus ini benar
            } else {
              c.questions.forEach(q => {
                let scoreFraction = 0;
                let userAnswer = (answers[q.id] || '').toString().toUpperCase();
                
                const checkAnswer = (expectedAnsStr) => {
                  if (expectedAnsStr === "-") {
                    const cleanUserAns = userAnswer.replace(/[^A-Z0-9-]/g, '');
                    if (cleanUserAns === "" || cleanUserAns === "-" || userAnswer.includes("TIDAK ADA") || userAnswer.includes("KOSONG") || userAnswer.includes("TIDAK")) {
                      return 1;
                    }
                    return 0;
                  }
                  
                  // Split by semicolon for multiple required codes
                  const requiredCodes = expectedAnsStr.split(';').map(c => c.trim().toUpperCase());
                  
                  // Check if required codes are present in userAnswer
                  let matchCount = 0;
                  requiredCodes.forEach(code => {
                    // Escape regex chars
                    const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Ensure the code is not immediately followed by another digit or dot
                    const regex = new RegExp(escapedCode + '(?!\\.|\\d)', 'i');
                    if (regex.test(userAnswer)) matchCount++;
                  });
                  
                  return matchCount / requiredCodes.length;
                };

                if (Array.isArray(q.answer)) {
                  scoreFraction = Math.max(...q.answer.map(ans => checkAnswer(ans.toString())));
                } else if (q.answer) {
                  scoreFraction = checkAnswer(q.answer.toString());
                }

                correctCount += scoreFraction;
              });
            }
          });

          calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
        }
      }

      if (submissionId) {
        await updateDoc(doc(db, "scores", submissionId), {
          score: calculatedScore,
          answers: answers,
          editCount: editCount + 1,
          lastEdited: serverTimestamp()
        });
        setEditCount(editCount + 1);
      } else {
        const docRef = await addDoc(collection(db, "scores"), {
          userId: userData.uid,
          quizTitle: quizData.title,
          participantName: userData.namaLengkap || userData.username || 'Unknown',
          instansi: userData.instansi || '-',
          kelompok: userData.kelompok || '-',
          score: calculatedScore,
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
          <h2 style={{ marginBottom: '1rem' }}>{editCount >= 1 ? 'Jawaban Terkunci!' : `Hasil Ujian ${quizData.title}`}</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            {editCount >= 1 
              ? 'Anda telah menggunakan batas pengubahan 1x. Jawaban Anda telah dikunci dan tidak bisa diubah lagi.' 
              : 'Sukses! Jawaban Anda telah dikirim.'}
          </p>
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

      <div style={{ display: 'flex', flex: 1, minHeight: '90vh' }}>
        {/* Left Side: PDF Viewer */}
        {currentCase.pdfUrl && (
          <div className="card" style={{ width: `${leftWidth}%`, flex: 'none', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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

        {/* Resizer Divider */}
        {currentCase.pdfUrl && (
          <div 
            onMouseDown={(e) => {
              e.preventDefault();
              isResizing.current = true;
              document.body.style.cursor = 'col-resize';
            }}
            style={{
              width: '16px',
              cursor: 'col-resize',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ width: '4px', height: '40px', backgroundColor: '#94a3b8', borderRadius: '2px' }} />
          </div>
        )}

        {/* Right Side: Quiz Form */}
        <div className="card" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', overflowX: 'auto', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', minWidth: '400px' }}>
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
                        disabled={editCount >= 1 || isLoadingData}
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
                              disabled={editCount >= 1 || isLoadingData}
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
                        disabled={editCount >= 1 || isLoadingData}
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
                disabled={isSubmitting || isLoadingData}
              >
                <FaCheckCircle /> {isLoadingData ? 'Memuat...' : isSubmitting ? 'Menyimpan...' : submissionId ? 'Update Jawaban (Sisa Edit: 1x)' : 'Finalisasi & Submit Jawaban'}
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
