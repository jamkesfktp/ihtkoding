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
import ManajemenUser from './pages/ManajemenUser';
import Login from './pages/Login';
import Register from './pages/Register';
import MenungguPersetujuan from './pages/MenungguPersetujuan';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menunggu-persetujuan" element={<MenungguPersetujuan />} />
              
              {/* Protected Routes */}
              <Route path="/materi" element={<ProtectedRoute><Materi /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/penugasan" element={<ProtectedRoute><Penugasan /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              
              <Route path="/quiz-mpi1" element={<ProtectedRoute><QuizMpi1 /></ProtectedRoute>} />
              <Route path="/quiz-mpi2" element={<ProtectedRoute><QuizCaseStudy quizData={quizDataMpi2} /></ProtectedRoute>} />
              <Route path="/quiz-mpi3" element={<ProtectedRoute><QuizCaseStudy quizData={quizDataMpi3} /></ProtectedRoute>} />
              <Route path="/quiz-mpi4" element={<ProtectedRoute><QuizCaseStudy quizData={quizDataMpi4} /></ProtectedRoute>} />
              <Route path="/quiz-pretest" element={<ProtectedRoute><QuizCaseStudy quizData={quizDataPreTest} /></ProtectedRoute>} />
              <Route path="/quiz-posttest" element={<ProtectedRoute><QuizCaseStudy quizData={quizDataPostTest} /></ProtectedRoute>} />
              <Route path="/penugasan-mpi5" element={<ProtectedRoute><PenugasanMpi5 /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/manajemen-user" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManajemenUser />
                </ProtectedRoute>
              } />

              {/* Fasilitator & Admin Route */}
              <Route path="/fasilitator-review" element={
                <ProtectedRoute allowedRoles={['admin', 'fasilitator']}>
                  <FasilitatorReview />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} IHT Pelatihan Koding. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
