import React from 'react';
import { FaTasks, FaDownload, FaChartPie, FaChartBar, FaTable, FaStethoscope, FaRegLightbulb, FaGoogleDrive } from 'react-icons/fa';

const PenugasanMpi5 = () => {
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
      </div>
    </div>
  );
};

export default PenugasanMpi5;
