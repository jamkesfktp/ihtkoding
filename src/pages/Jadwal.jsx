import React from 'react';
import { FaCalendarCheck, FaClock, FaUserTie } from 'react-icons/fa';

const scheduleData = [
  {
    day: "Hari 1",
    date: "17 Juni 2026",
    events: [
      { time: "07:30 - 08:00", title: "Pre Test", speaker: "Plataran Sehat" },
      { time: "08:00 - 08:45", title: "Pembukaan", speaker: "-" },
      { time: "08:45 - 09:00", title: "Break", speaker: "-" },
      { time: "09:00 - 10:30", title: "MP 1 : Building Learning Commitment (BLC)", speaker: "Diklat Sardjito" },
      { time: "10:30 - 12:00", title: "MD 1 : Kebijakan Program JKN", speaker: "Kapus" },
      { time: "12:00 - 13:00", title: "ISHOMA", speaker: "-" },
      { time: "13:00 - 14:30", title: "MD 2 : Kebijakan Rekam Medis Elektronik dan Kode Etik Perekam Medis", speaker: "Fasilitator RS" },
      { time: "14:30 - 16:00", title: "MD 3 : Pola Pembayaran FPKTL dengan Menggunakan iDRG", speaker: "Rida" },
      { time: "16:00 - 17:30", title: "MD 4 : Verifikasi Klaim JKN", speaker: "Maria" }
    ]
  },
  {
    day: "Hari 2",
    date: "18 Juni 2026",
    events: [
      { time: "07:30 - 08:00", title: "Refleksi", speaker: "Pengendali Pelatihan" },
      { time: "08:00 - 08:45", title: "MI 1 : Analisis Kelengkapan Rekam Medis sebagai dasar Klaim JKN", speaker: "Maria" },
      { time: "08:45 - 10:15", title: "MI 2 : Kodifikasi Penyakit dan Masalah Kesehatan", speaker: "Yosi" },
      { time: "10:15 - 10:30", title: "Break", speaker: "-" },
      { time: "10:30 - 12:00", title: "MI 2 : Kodifikasi Penyakit dan Masalah Kesehatan", speaker: "Riki" },
      { time: "12:00 - 13:00", title: "ISHOMA", speaker: "-" },
      { time: "13:00 - 14:30", title: "MI 3 : Kodifikasi Tindakan/Prosedur dan Masalah Kesehatan", speaker: "Yosi" },
      { time: "14:30 - 15:15", title: "MI 4 : Optimalisasi Input Data dan Penyelesaian Masalah Ungroupable", speaker: "Adit" },
      { time: "15:15 - 16:00", title: "MI 5 : Analisis Data Klaim dalam iDRG", speaker: "Shabrina" },
      { time: "16:00 - 17:30", title: "MP 2 : Anti Korupsi (Fraud dalam JKN)", speaker: "SPI SARDJITO" }
    ]
  },
  {
    day: "Hari 3",
    date: "19 Juni 2026",
    events: [
      { time: "07:30 - 08:00", title: "Refleksi", speaker: "Pengendali Pelatihan" },
      { time: "08:00 - 09:30", title: "MI 1 : Analisis Kelengkapan Rekam Medis sebagai dasar Klaim JKN", speaker: "Maria" },
      { time: "09:30 - 09:45", title: "Break", speaker: "-" },
      { time: "09:45 - 11:15", title: "MI 2 : Kodifikasi Penyakit dan Masalah Kesehatan", speaker: "Riki" },
      { time: "11:15 - 12:30", title: "ISHOMA", speaker: "-" },
      { time: "12:30 - 15:30", title: "MI 2 : Kodifikasi Penyakit dan Masalah Kesehatan", speaker: "Riki" },
      { time: "15:30 - 17:00", title: "MI 3 : Kodifikasi Tindakan/Prosedur dan Masalah Kesehatan", speaker: "Riki" }
    ]
  },
  {
    day: "Hari 4",
    date: "20 Juni 2026",
    events: [
      { time: "07:30 - 08:00", title: "Refleksi", speaker: "-" },
      { time: "08:00 - 09:30", title: "MI 3 : Kodifikasi Tindakan/Prosedur dan Masalah Kesehatan", speaker: "Riki" },
      { time: "09:30 - 09:45", title: "Break", speaker: "-" },
      { time: "09:45 - 11:15", title: "MI 4 : Optimalisasi Input Data dan Penyelesaian Masalah Ungroupable", speaker: "Adit" },
      { time: "11:15 - 12:30", title: "ISHOMA", speaker: "-" },
      { time: "12:30 - 14:45", title: "MI 5 : Analisis Data Klaim dalam iDRG", speaker: "Riki" },
      { time: "14:45 - 16:15", title: "MP 3 : Rencana Tindak Lanjut (RTL)", speaker: "Riki + Adit + Maria" },
      { time: "16:15 - 17:00", title: "Penutupan", speaker: "-" }
    ]
  }
];

const Jadwal = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="title">Jadwal Pelatihan</h1>
          <p className="subtitle">Rangkaian kegiatan Workshop Pelatihan Koding RSUP Dr. Sardjito</p>
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
