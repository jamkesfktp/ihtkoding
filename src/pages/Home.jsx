import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, FaTasks, FaCalendarCheck, FaTrophy, 
  FaGraduationCap, FaArrowRight, FaCheckCircle, 
  FaUserCheck, FaLaptopCode, FaChartLine, FaDesktop 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { userData, currentUser } = useAuth();

  const modules = [
    {
      id: 'mpd',
      title: 'Materi Pokok Dasar (MPD)',
      subtitle: 'Kebijakan JKN, Tarif iDRG, Verifikasi Klaim, & Fraud',
      desc: 'Memahami fondasi kebijakan JKN, sistem tarif iDRG, pencegahan fraud, dan prosedur verifikasi klaim di FPKTL.',
      tag: 'Kebijakan & Sistem',
      color: '#0d9488',
      link: '/materi',
      icon: <FaBookOpen />
    },
    {
      id: 'mpi1',
      title: 'MPI 1: Analisis Rekam Medis',
      subtitle: 'Analisis Kuantitatif, Kualitatif & Auto Slide Deck',
      desc: 'Melakukan kelengkapan dokumen rekam medis sebagai syarat klaim dan menghasilkan slide presentasi otomatis.',
      tag: 'Audit Kelengkapan',
      color: '#2563eb',
      link: '/penugasan',
      icon: <FaDesktop />
    },
    {
      id: 'mpi2-3',
      title: 'MPI 2 & 3: Kodifikasi ICD-10 & ICD-9-CM',
      subtitle: 'Aturan Dasar, Diagnosis Penyakit, & Prosedur Medis',
      desc: 'Praktik pengodean diagnosis utama/sekunder serta tindakan medis sesuai kaidah ICD-10 dan ICD-9-CM.',
      tag: 'Praktik Koding',
      color: '#7c3aed',
      link: '/materi',
      icon: <FaLaptopCode />
    },
    {
      id: 'mpi4-5',
      title: 'MPI 4 & 5: Ungroupable & Looker Studio',
      subtitle: 'Resolusi Ungroupable iDRG & Visualisasi Data Klaim',
      desc: 'Troubleshooting masalah ungroupable pada aplikasi E-Klaim dan analisis data klaim berbasis Looker Studio.',
      tag: 'Analisis Data',
      color: '#059669',
      link: '/penugasan',
      icon: <FaChartLine />
    }
  ];

  return (
    <div className="home-page" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Hero Banner LMS Kemenkes */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f2e46 0%, #0d9488 100%)', 
        padding: '4.5rem 0 5rem', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(15, 46, 70, 0.2)'
      }}>
        {/* Background Decorative Glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(0,169,157,0.15)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: '#ccfbf1', marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <FaGraduationCap /> KEMENTERIAN KESEHATAN RI • LMS LEARNING PORTAL
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
            Portal Pelatihan Koding & Tarif iDRG di FPKTL
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '750px', margin: '0 0 2.5rem', lineHeight: 1.6 }}>
            Selamat datang di Sistem Pembelajaran Terpadu (*Learning Management System*) Pelatihan Koding dan Analisis Klaim JKN bagi Tenaga Koder FPKTL.
          </p>

          {/* User Welcome Card / CTA Banner */}
          {currentUser && userData ? (
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1.5rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', maxWidth: '900px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#00a99d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                  {userData.namaLengkap ? userData.namaLengkap.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#99f6e4', fontWeight: 600 }}>SELAMAT DATANG PESERTA</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{userData.namaLengkap || userData.username}</div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{userData.instansi || '-'} • Kelompok {userData.kelompok || '-'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/materi" className="btn" style={{ backgroundColor: '#ffffff', color: '#0f2e46', fontWeight: 700, padding: '0.7rem 1.4rem' }}>
                  <FaBookOpen /> Buka Modul Materi
                </Link>
                <Link to="/penugasan" className="btn" style={{ backgroundColor: '#00a99d', color: 'white', fontWeight: 700, padding: '0.7rem 1.4rem' }}>
                  <FaTasks /> Workspace Penugasan
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn" style={{ backgroundColor: '#ffffff', color: '#0f2e46', fontWeight: 700, padding: '0.8rem 2rem', fontSize: '1.05rem' }}>
                Login Portal LMS &rarr;
              </Link>
              <Link to="/jadwal" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600, padding: '0.8rem 1.8rem' }}>
                <FaCalendarCheck /> Lihat Jadwal Pelatihan
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Quick LMS Stats Indicator Row */}
      <section style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            
            <div className="card glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', height: 'auto' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                <FaBookOpen />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>5 Modul</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Materi Pelatihan Terintegrasi</div>
              </div>
            </div>

            <div className="card glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', height: 'auto' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                <FaTasks />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Studi Kasus</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Simulasi Audit & E-Klaim</div>
              </div>
            </div>

            <div className="card glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', height: 'auto' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                <FaTrophy />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Leaderboard</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Peringkat Skor Real-time</div>
              </div>
            </div>

            <div className="card glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', height: 'auto' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                <FaCalendarCheck />
              </div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>12-15 Agst</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Jadwal Workshop 2026</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Course Modules Grid */}
      <section style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="lms-badge lms-badge-kemenkes" style={{ marginBottom: '0.5rem' }}>
              <FaGraduationCap /> SILABUS PEMBELAJARAN
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a' }}>
              Modul Pelatihan & Ruang Kerja Koder
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Pilih modul di bawah ini untuk mengakses bahan bacaan, latihan studi kasus, serta alat bantu presentasi.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
            {modules.map((m) => (
              <div key={m.id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div className="card-icon" style={{ backgroundColor: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}>
                    {m.icon}
                  </div>
                  <span className="lms-badge" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                    {m.tag}
                  </span>
                </div>

                <h3 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {m.title}
                </h3>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: m.color, marginBottom: '0.75rem' }}>
                  {m.subtitle}
                </div>
                <p className="card-desc" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {m.desc}
                </p>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FaCheckCircle /> Modul Aktif
                  </span>
                  <Link to={m.link} className="btn btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', color: m.color, borderColor: m.color }}>
                    Buka <FaArrowRight style={{ fontSize: '0.75rem' }} />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

