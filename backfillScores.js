import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHY_lOo4l5vHM1ZiSaIy4o5_aBPs-0Rog",
  authDomain: "ihtkoding.firebaseapp.com",
  projectId: "ihtkoding",
  storageBucket: "ihtkoding.firebasestorage.app",
  messagingSenderId: "121468676927",
  appId: "1:121468676927:web:c4424f139d2c79945e418a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const answerKeyMpi1 = {
  1: {
    kuantitatif: {
      A1: "10", B1: "5", B2: "5", B3: "5", B4: "10", B5: "10", B6: "5", B7: "5", B8: "5", B9: "10", B10: "5", C1: "5", C2: "5", C3: "0"
    },
    kualitatif: {
      A1: "10", A2: "5", A3: "0", B1: "10", B2: "0", C1: "10", C2: "10", C3: "5", D1: "15"
    }
  },
  2: {
    kuantitatif: {
      A1: "10", B1: "5", B2: "5", B3: "5", B4: "15", B5: "10", B6: "5", B7: "5", B8: "5", B9: "5", B10: "5", C1: "5", C2: "5", C3: "0"
    },
    kualitatif: {
      A1: "15", A2: "10", A3: "0", B1: "10", B2: "20", C1: "5", C2: "10", C3: "5", D1: "15"
    }
  },
  3: {
    kuantitatif: {
      A1: "10", B1: "5", B2: "5", B3: "5", B4: "10", B5: "10", B6: "5", B7: "0", B8: "5", B9: "10", B10: "5", C1: "5", C2: "5", C3: "0"
    },
    kualitatif: {
      A1: "15", A2: "10", A3: "0", B1: "10", B2: "10", C1: "5", C2: "5", C3: "0", D1: "10"
    }
  },
  4: {
    kuantitatif: {
      A1: "10", B1: "5", B2: "5", B3: "5", B4: "10", B5: "10", B6: "5", B7: "5", B8: "5", B9: "10", B10: "5", C1: "0", C2: "5", C3: "0"
    },
    kualitatif: {
      A1: "10", A2: "5", A3: "5", B1: "5", B2: "10", C1: "5", C2: "5", C3: "5", D1: "15"
    }
  }
};

const mpi4Keywords = {
  "1_solusi": ["93.01", "93.34"],
  "2_solusi": ["Z37.3"],
  "3_solusi": ["E11.5", "86.22", "86.28"],
  "4_solusi": ["H25", "H26", "HL00"],
  "5_solusi": ["U83.3"],
  "6_solusi": ["00.40"]
};

async function backfill() {
  console.log("Fetching scores...");
  const snapshot = await getDocs(collection(db, "scores"));
  
  let updatedMpi1 = 0;
  let updatedMpi2 = 0;
  let updatedMpi3 = 0;
  let updatedMpi4 = 0;

  for (const document of snapshot.docs) {
    const data = document.data();
    
    let calculatedScore = 0;

    if (data.quizTitle.includes("MPI 1") && data.answers) {
      let totalMatched = 0;
      let totalItems = 0;

        Object.keys(data.answers).forEach(caseId => {
          const caseAnswers = data.answers[caseId];
          const caseKey = answerKeyMpi1[caseId];
          if (caseKey && typeof caseAnswers === 'object') {
            if (caseAnswers.kuantitatif) {
              Object.keys(caseKey.kuantitatif).forEach(param => {
                totalItems++;
                if (caseAnswers.kuantitatif[param]?.skor === caseKey.kuantitatif[param]) {
                  totalMatched++;
                }
              });
            }
            if (caseAnswers.kualitatif) {
              Object.keys(caseKey.kualitatif).forEach(param => {
                totalItems++;
                if (caseAnswers.kualitatif[param]?.skor === caseKey.kualitatif[param]) {
                  totalMatched++;
                }
              });
            }
          }
        });

        if (totalItems > 0) {
          calculatedScore = Math.round((totalMatched / totalItems) * 100);
          console.log(`Updating MPI 1 for ${data.participantName} - Score: ${calculatedScore}`);
          await updateDoc(doc(db, "scores", document.id), { score: calculatedScore });
          updatedMpi1++;
        }
      } 
      else if (data.quizTitle.includes("MPI 2") || data.quizTitle.includes("MPI 3") || data.quizTitle.includes("MPI-2") || data.quizTitle.includes("MPI-3")) {
        const isMpi2 = data.quizTitle.includes("MPI 2") || data.quizTitle.includes("MPI-2");
        const quizData = isMpi2 ? (await import('./src/data/quizDataMpi2.js')).quizDataMpi2 : (await import('./src/data/quizDataMpi3.js')).quizDataMpi3;
        
        let correctCount = 0;
        let totalQuestions = 0;

        quizData.cases.forEach(c => {
          totalQuestions += c.questions.length;
          c.questions.forEach(q => {
            let scoreFraction = 0;
            let userAnswer = (data.answers[q.id] || '').toString().toUpperCase();
            
            const checkAnswer = (expectedAnsStr) => {
              if (expectedAnsStr === "-") {
                const cleanUserAns = userAnswer.replace(/[^A-Z0-9-]/g, '');
                if (cleanUserAns === "" || cleanUserAns === "-" || userAnswer.includes("TIDAK ADA") || userAnswer.includes("KOSONG") || userAnswer.includes("TIDAK")) {
                  return 1;
                }
                return 0;
              }
              
              const requiredCodes = expectedAnsStr.split(';').map(c => c.trim().toUpperCase());
              let matchCount = 0;
              requiredCodes.forEach(code => {
                const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
        });

        if (totalQuestions > 0) {
          calculatedScore = Math.round((correctCount / totalQuestions) * 100);
          console.log(`Updating ${isMpi2 ? 'MPI 2' : 'MPI 3'} for ${data.participantName} - Old Score: ${data.score}, New Score: ${calculatedScore}`);
          await updateDoc(doc(db, "scores", document.id), { score: calculatedScore });
          if (isMpi2) updatedMpi2++; else updatedMpi3++;
        }
      }
      else if (data.quizTitle.includes("MPI 4") && data.answers && (data.score === "Pending" || typeof data.score === "string")) {
        let correctCount = 0;
        let totalQuestions = 6;
        
        Object.keys(mpi4Keywords).forEach(qId => {
          const userAnswer = (data.answers[qId] || '').toString().toUpperCase();
          const keywords = mpi4Keywords[qId];
          if (keywords.some(kw => userAnswer.includes(kw.toUpperCase()))) {
            correctCount++;
          }
        });

        calculatedScore = Math.round((correctCount / totalQuestions) * 100);
        console.log(`Updating MPI 4 for ${data.participantName} - Score: ${calculatedScore}`);
        await updateDoc(doc(db, "scores", document.id), { score: calculatedScore });
        updatedMpi4++;
      }
  }

  console.log(`Finished! Updated ${updatedMpi1} MPI 1, ${updatedMpi2} MPI 2, ${updatedMpi3} MPI 3, and ${updatedMpi4} MPI 4 submissions.`);
  process.exit(0);
}

backfill().catch(console.error);
