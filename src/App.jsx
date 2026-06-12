import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jadwal from './pages/Jadwal';
import Materi from './pages/Materi';
import Penugasan from './pages/Penugasan';
import Quiz from './pages/Quiz';
import QuizCaseStudy from './pages/QuizCaseStudy';
import { quizDataMpi2 } from './data/quizDataMpi2';
import { quizDataMpi3 } from './data/quizDataMpi3';
import { quizDataMpi4 } from './data/quizDataMpi4';
import { quizDataPreTest } from './data/quizDataPreTest';
import { quizDataPostTest } from './data/quizDataPostTest';
import PenugasanMpi5 from './pages/PenugasanMpi5';
import Leaderboard from './pages/Leaderboard';
import QuizMpi1 from './pages/QuizMpi1';
import FasilitatorReview from './pages/FasilitatorReview';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/fasilitator-review" element={<FasilitatorReview />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/quiz-mpi1" element={<QuizMpi1 />} />
            <Route path="/quiz-mpi2" element={<QuizCaseStudy quizData={quizDataMpi2} />} />
            <Route path="/quiz-mpi3" element={<QuizCaseStudy quizData={quizDataMpi3} />} />
            <Route path="/quiz-mpi4" element={<QuizCaseStudy quizData={quizDataMpi4} />} />
            <Route path="/quiz-pretest" element={<QuizCaseStudy quizData={quizDataPreTest} />} />
            <Route path="/quiz-posttest" element={<QuizCaseStudy quizData={quizDataPostTest} />} />
            <Route path="/penugasan-mpi5" element={<PenugasanMpi5 />} />
            <Route path="/penugasan" element={<Penugasan />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} RSUP Dr. Sardjito - Pelatihan Koding. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
