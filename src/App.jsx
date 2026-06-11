import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jadwal from './pages/Jadwal';
import Materi from './pages/Materi';
import Soal from './pages/Soal';
import Penugasan from './pages/Penugasan';
import Quiz from './pages/Quiz';

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
            <Route path="/soal" element={<Soal />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/penugasan" element={<Penugasan />} />
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
