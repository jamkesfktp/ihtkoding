import React from 'react';
import { FaCalendarCheck, FaClock, FaUserTie } from 'react-icons/fa';

const scheduleData = [
  {
    day: "Hari 1",
    date: "Selasa, 12 Agustus 2026",
    events: [
      { time: "07:00 - 07:30", title: "Registrasi Peserta", speaker: "Panitia" },
      { time: "07:30 - 08:00", title: "Pre Test", speaker: "Pusat Pembiayaan Kesehatan" },
      { time: "08:00 - 08:30", title: "Pembukaan", speaker: "Panitia" },
      { time: "08:30 - 10:00", title: "MPD Kebijakan JKN menuju iDRG", speaker: "Kepala Pusat Pembiayaan Kesehatan" },
      { time: "10:00 - 10:15", title: "Coffee Break", speaker: "-" },
      { time: "10:15 - 11:45", title: "MPD Rancangan Tarif Pembiayaan iDRG", speaker: "Ketua Tim Kerja iDRG dan Casemix" },
      { time: "11:45 - 12:45", title: "Ishoma", speaker: "-" },
      { time: "12:45 - 14:15", title: "MPD Verifikasi Klaim", speaker: "Ketua Tim Kerja Pembiayaan Program JKN di FPKTL" },
      { time: "14:15 - 15:45", title: "MPD Fraud dalam JKN", speaker: "Ketua Tim Kerja Pembiayaan Program JKN di FPKTL" },
      { time: "15:45 - 16:15", title: "Coffee Break & Sholat Asar", speaker: "-" },
      { time: "16:15 - 18:30", title: "MPI 1 Analisis Rekam Medis + Praktek", speaker: "dr Gracia Stella" }
    ]
  },
  {
    day: "Hari 2",
    date: "Rabu, 13 Agustus 2026",
    events: [
      { time: "07:30 - 07:45", title: "Refleksi Hari Sebelumnya", speaker: "Pusat Pembiayaan Kesehatan" },
      { time: "07:45 - 08:30", title: "MPI 2 Aturan Dasar ICD 10", speaker: "Yosi Prasetyo" },
      { time: "08:30 - 10:00", title: "MPI 2 Aturan Koding iDRG", speaker: "Yosi Prasetyo" },
      { time: "10:00 - 10:15", title: "Coffee Break", speaker: "-" },
      { time: "10:15 - 11:45", title: "MPI 2 Praktik Kodefikasi Diagnosis Penyakit", speaker: "Yosi Prasetyo" },
      { time: "11:45 - 12:45", title: "Ishoma", speaker: "-" },
      { time: "12:45 - 14:15", title: "MPI 2 Praktik Kodefikasi Diagnosis Penyakit (Lanjutan)", speaker: "Yosi Prasetyo" },
      { time: "14:15 - 15:45", title: "MPI 2 Praktik Kodefikasi Diagnosis Penyakit (Lanjutan)", speaker: "Yosi Prasetyo" },
      { time: "15:45 - 16:15", title: "Coffee Break & Sholat Asar", speaker: "-" },
      { time: "16:15 - 17:45", title: "MPI 3 Aturan Koding ICD 9CM", speaker: "Riki Permana Putra" }
    ]
  },
  {
    day: "Hari 3",
    date: "Kamis, 14 Agustus 2026",
    events: [
      { time: "07:30 - 07:45", title: "Refleksi Hari Sebelumnya", speaker: "Pusat Pembiayaan Kesehatan" },
      { time: "07:45 - 09:15", title: "MPI 3 Praktek Koding ICD 9 CM", speaker: "Riki Permana Putra" },
      { time: "09:15 - 10:45", title: "MPI 3 Praktek Koding ICD 9 CM", speaker: "Riki Permana Putra" },
      { time: "10:45 - 11:00", title: "Coffee Break", speaker: "-" },
      { time: "11:00 - 12:30", title: "MPI 5 Analisis Data Klaim", speaker: "Riki Permana Putra" },
      { time: "12:30 - 13:30", title: "Ishoma", speaker: "-" },
      { time: "13:30 - 15:00", title: "MPI 5 Praktek Analisis Data Klaim Looker Studio", speaker: "Riki Permana Putra" },
      { time: "15:00 - 15:45", title: "Kode Etik Perekam Medis", speaker: "Riki Permana Putra" },
      { time: "15:45 - 16:15", title: "Coffee Break & Sholat Asar", speaker: "-" },
      { time: "16:15 - 17:45", title: "MPI 4 Ungroupable iDRG", speaker: "Ardian Permana" }
    ]
  },
  {
    day: "Hari 4",
    date: "Jumat, 15 Agustus 2026",
    events: [
      { time: "08:00 - 08:15", title: "Refleksi Hari Sebelumnya", speaker: "Pusat Pembiayaan Kesehatan" },
      { time: "08:15 - 09:00", title: "MPI 4 Praktek Ungroupable iDRG", speaker: "Ardian Permana" },
      { time: "09:00 - 10:15", title: "MPI 4 Praktek Ungroupable iDRG", speaker: "Ardian Permana" },
      { time: "10:15 - 10:30", title: "Coffee Break", speaker: "-" },
      { time: "10:30 - 11:30", title: "RTL (Rencana Tindak Lanjut)", speaker: "Ardian Permana + Zoom" },
      { time: "11:30 - 13:00", title: "Ishoma", speaker: "-" },
      { time: "13:00 - 14:30", title: "Post Test", speaker: "Panitia" },
      { time: "14:30 - 15:15", title: "Penutupan Acara", speaker: "Panitia" },
      { time: "15:15 - 17:00", title: "Penyelesaian Administrasi Peserta", speaker: "Panitia" }
    ]
  }
];

const Jadwal = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="title">Jadwal Pelatihan</h1>
          <p className="subtitle">Rangkaian kegiatan Pelatihan Bagi Tenaga Koder di FPKTL (12–15 Agustus 2026)</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '900px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {scheduleData.map((dayData, dayIndex) => (
            <div key={dayIndex} className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '2px solid var(--color-primary-light)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                  <FaCalendarCheck size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-secondary)' }}>{dayData.day}</h2>
                  <span className="text-primary" style={{ fontWeight: 600 }}>{dayData.date}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {dayData.events.map((event, eventIndex) => (
                  <div key={eventIndex} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: '140px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
                      <FaClock style={{ color: 'var(--color-primary)' }} />
                      {event.time}
                    </div>
                    <div style={{ flex: 1, backgroundColor: 'var(--color-bg)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)' }}>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>{event.title}</h3>
                      {event.speaker !== "-" && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                          <FaUserTie /> {event.speaker}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Jadwal;
