import React, { useState } from 'react';
import { FaTasks, FaDownload, FaChartPie, FaChartBar, FaTable, FaStethoscope, FaRegLightbulb, FaGoogleDrive, FaPaperPlane } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const PenugasanMpi5 = () => {
  const [linkSlide, setLinkSlide] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participantInfo, setParticipantInfo] = useState(() => {
    const saved = localStorage.getItem('participantInfo');
    return saved ? JSON.parse(saved) : { nama: '', instansi: '', kelompok: '' };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!participantInfo.nama.trim() || !participantInfo.kelompok.trim() || !linkSlide.trim()) {
      alert('Silakan isi Nama Peserta, Kelompok, dan Link Presentasi!');
      return;
    }
    
    localStorage.setItem('participantInfo', JSON.stringify(participantInfo));
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "scores"), {
        quizTitle: "Ujian Penugasan MPI 5",
        participantName: participantInfo.nama.trim(),
        instansi: participantInfo.instansi.trim(),
        kelompok: participantInfo.kelompok.trim(),
        score: "Pending",
        answers: { linkSlide },
        timestamp: serverTimestamp()
      });
      alert('Berhasil! Link presentasi Anda telah dikirim dan menunggu review Fasilitator.');
      setLinkSlide('');
    } catch (error) {
      console.error("Error submitting link: ", error);
      alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem 1rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 5rem)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: '0.5rem' }}>Penugasan MPI 5</h1>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Analisis, Pengolahan, dan Interpretasi Data Klaim
        </p>

        <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderTop: '5px solid var(--color-primary)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
            <FaTasks style={{ color: 'var(--color-primary)' }} /> Langkah Pengerjaan Penugasan
          </h2>
          
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', color: '#475569' }}>
            <li><strong>Kerjakan studi kasus</strong> pada link yang telah disediakan oleh fasilitator.</li>
            <li><strong style={{ color: '#0ea5e9' }}>Unduh data TXT</strong> yang sudah disiapkan pada masing-masing folder kelompok.</li>
            <li>Lakukan pengolahan, penyajian dan interpretasi data sesuai dengan ketentuan yang ada di bawah (Waktu pengerjaan maksimal <strong style={{ color: '#ef4444' }}>30 menit</strong>).</li>
            <li><strong>Masukkan jawaban</strong> berupa grafik dan tabel pada slide Google Slides yang ada pada link kelompok masing-masing.</li>
            <li>Tentukan perwakilan dari setiap kelompok dan <strong>presentasikan hasil studi kasus</strong> (setiap kelompok paling lama 10 menit).</li>
            <li>Kelompok lain wajib <strong>mengamati dan menanggapi</strong> kelompok yang sedang presentasi.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: '2rem', borderTop: '5px solid #0ea5e9' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
            <FaChartPie style={{ color: '#0ea5e9' }} /> Ketentuan Pengolahan Data
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
            Berdasarkan data bersih (tanpa outlier), Anda diwajibkan untuk menampilkan visualisasi dan analisis berikut di dalam slide presentasi Anda:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6d28d9' }}>
                <FaChartPie /> Diagram Lingkaran
              </div>
              Tampilkan proporsi <strong>Kelas Rawat Inap</strong>.
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#047857' }}>
                <FaChartBar /> Diagram Batang
              </div>
              Tampilkan <strong>Frekuensi per MDC</strong> Rawat Inap.
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', gridColumn: '1 / -1' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#b45309' }}>
                <FaTable /> Top 10 Kode iDRG
              </div>
              Buat tabel berisi 10 kode iDRG Rawat Inap dengan jumlah kasus terbanyak. Kolom wajib:
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', color: '#78350f' }}>
                <li>Kode iDRG & Jumlah Kasus</li>
                <li>Tarif INA-CBG (dummy tarif iDRG)*</li>
                <li>Tarif RS</li>
                <li>Selisih antara Tarif INA-CBG dengan Tarif RS</li>
                <li>% Selisih antara Tarif INA-CBG dengan Tarif RS</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ec4899', gridColumn: '1 / -1' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#be185d' }}>
                <FaStethoscope /> Top 10 Dokter DPJP
              </div>
              Buat tabel berisi 10 Dokter DPJP Rawat Inap dengan jumlah kasus terbanyak. Kolom wajib:
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', color: '#831843' }}>
                <li>Nama Dokter DPJP & Jumlah Kasus</li>
                <li>Tarif INA-CBG (dummy tarif iDRG)*</li>
                <li>Tarif RS</li>
                <li>Selisih antara Tarif INA-CBG dengan Tarif RS</li>
                <li>% Selisih antara Tarif INA-CBG dengan Tarif RS</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#b91c1c' }}>
                <FaTable /> Audit Koding
              </div>
              Lakukan audit koding pada kasus <strong>TB Paru dengan BTA + (A15.0)</strong> yang disertai dengan <strong>Pneumonia (J18.0 – J18.9)</strong>.
            </div>

            <div style={{ backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#1d4ed8' }}>
                <FaRegLightbulb /> Rekomendasi
              </div>
              Berikan kesimpulan dan <strong>Rekomendasi</strong> dari hasil analisis data klaim yang telah kelompok Anda lakukan.
            </div>

          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="#" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <FaGoogleDrive /> Buka Folder Kelompok Anda
            </a>
          </div>

        </div>

        {/* Form Submit Link Presentasi */}
        <div className="card" style={{ padding: '2rem', borderTop: '5px solid #10b981', marginTop: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
            <FaPaperPlane style={{ color: '#10b981' }} /> Pengumpulan Penugasan MPI 5
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
            Setelah selesai membuat presentasi di Google Slides, silakan isi form di bawah ini untuk mengirimkan hasil kerja Anda ke Fasilitator. Nilai akan diberikan secara manual.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Nama Lengkap Peserta *</label>
              <input 
                type="text" 
                placeholder="Contoh: Budi Santoso" 
                value={participantInfo.nama}
                onChange={(e) => setParticipantInfo({...participantInfo, nama: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Instansi Asal</label>
              <input 
                type="text" 
                placeholder="Contoh: RSUD dr. Soetomo" 
                value={participantInfo.instansi}
                onChange={(e) => setParticipantInfo({...participantInfo, instansi: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Nama Kelompok / Angkatan *</label>
              <input 
                type="text" 
                placeholder="Contoh: Kelompok 1" 
                value={participantInfo.kelompok}
                onChange={(e) => setParticipantInfo({...participantInfo, kelompok: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>Link Google Slides Kelompok *</label>
              <input 
                type="url" 
                placeholder="https://docs.google.com/presentation/d/..." 
                value={linkSlide}
                onChange={(e) => setLinkSlide(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary" 
              style={{ padding: '0.8rem', fontSize: '1rem', marginTop: '1rem', backgroundColor: '#10b981', borderColor: '#10b981' }}
            >
              {isSubmitting ? 'Mengirim...' : 'Tandai Selesai & Kirim ke Fasilitator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PenugasanMpi5;
