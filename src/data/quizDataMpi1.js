export const mpi1QuestionsTemplate = [
  { id: "rm", label: "No Rekam Medis", type: "text" },
  { id: "sep", label: "No SEP", type: "text" },
  { id: "nama", label: "Nama Pasien", type: "text" },
  { id: "dpjp", label: "Nama DPJP", type: "text" },
  { id: "kuan_a1", label: "Kuantitatif A1: Kesesuaian Tanggal", type: "number" },
  { id: "kuan_b1", label: "Kuantitatif B1: Identitas Pasien Lengkap", type: "number" },
  { id: "kuan_b2", label: "Kuantitatif B2: Tanggal & Jam Masuk/Keluar", type: "number" },
  { id: "kuan_b3", label: "Kuantitatif B3: Anamnesis & Kondisi Saat Masuk", type: "number" },
  { id: "kuan_b4", label: "Kuantitatif B4: Diagnosa Utama & Sekunder", type: "number" },
  { id: "kuan_b5", label: "Kuantitatif B5: Prosedur/Tindakan Medis", type: "number" },
  { id: "kuan_b6", label: "Kuantitatif B6: Pengobatan & Tatalaksana", type: "number" },
  { id: "kuan_b7", label: "Kuantitatif B7: Hasil Pemeriksaan Penunjang", type: "number" },
  { id: "kuan_b8", label: "Kuantitatif B8: Kondisi & Rencana Saat Pulang", type: "number" },
  { id: "kuan_b9", label: "Kuantitatif B9: Autentikasi DPJP (Nama & TTD)", type: "number" },
  { id: "kuan_b10", label: "Kuantitatif B10: Tanggal Pembuatan Resume", type: "number" },
  { id: "kuan_c1", label: "Kuantitatif C1: Surat Keterangan Meninggal*", type: "number" },
  { id: "kuan_c2", label: "Kuantitatif C2: Laporan Operasi/Tindakan", type: "number" },
  { id: "kuan_c3", label: "Kuantitatif C3: Informed Consent*", type: "number" },
  { id: "kual_a1", label: "Kualitatif A1: Diagnosa Utama vs Temuan Klinis", type: "number" },
  { id: "kual_a2", label: "Kualitatif A2: Diagnosa Sekunder vs Komplikasi/Komorbid", type: "number" },
  { id: "kual_a3", label: "Kualitatif A3: Urutan Penulisan Diagnosa", type: "number" },
  { id: "kual_b1", label: "Kualitatif B1: Pengobatan dengan Diagnosis", type: "number" },
  { id: "kual_b2", label: "Kualitatif B2: Kesesuaian Prosedur Utama & Diagnosa Utama", type: "number" },
  { id: "kual_c1", label: "Kualitatif C1: Kelengkapan Data dalam Resume", type: "number" },
  { id: "kual_c2", label: "Kualitatif C2: Konsistensi dengan Laporan Tindakan", type: "number" },
  { id: "kual_c3", label: "Kualitatif C3: Kesesuaian dengan Hasil Penunjang", type: "number" },
  { id: "kual_d1", label: "Kualitatif D1: Indikasi Rawat Inap", type: "number" },
  { id: "kesimpulan", label: "Kesimpulan (Layak Klaim / Perlu Koreksi / Tidak Layak)", type: "text", uppercase: false }
];

const generateCaseQuestions = (caseIndex) => {
  return mpi1QuestionsTemplate.map(q => ({
    ...q,
    id: `${caseIndex}_${q.id}`
  }));
};

export const quizDataMpi1 = {
  title: "Formulir Analisis Resume Medis MPI 1",
  description: "KETENTUAN PENGISIAN:\n1. Isikan Data Identitas sesuai Rekam Medis.\n2. Isikan Skor Angka untuk bagian Kuantitatif dan Kualitatif sesuai pedoman penilaian (0, 3, 5, 10, 15, 20).\n3. Isikan Kesimpulan di bagian akhir.",
  cases: [
    {
      id: 1,
      title: "SOAL 1 - Analisis RM 1",
      pdfUrl: "/pdfs/mpi1-soal-1.pdf",
      questions: generateCaseQuestions(1)
    },
    {
      id: 2,
      title: "SOAL 2 - Analisis RM 2",
      pdfUrl: "/pdfs/mpi1-soal-2.pdf",
      questions: generateCaseQuestions(2)
    },
    {
      id: 3,
      title: "SOAL 3 - Analisis RM 3",
      pdfUrl: "/pdfs/mpi1-soal-3.pdf",
      questions: generateCaseQuestions(3)
    },
    {
      id: 4,
      title: "SOAL 4 - Analisis RM 4",
      pdfUrl: "/pdfs/mpi1-soal-4.pdf",
      questions: generateCaseQuestions(4)
    }
  ]
};
