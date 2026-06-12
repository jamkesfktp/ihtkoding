const generateCaseQuestions = (caseIndex) => {
  return [
    { 
      id: `${caseIndex}_solusi`, 
      label: "Hasil Grouping E-klaim & Solusi Masalah", 
      type: "textarea",
      placeholder: "Tuliskan hasil grouping dari E-klaim di sini. Jika terjadi error grouping/ungroupable, identifikasilah permasalahan yang terjadi dan tuliskan alternatif solusinya secara naratif..."
    }
  ];
};

export const quizDataMpi4 = {
  title: "Penugasan MPI 4 - Trouble Shooting E-Klaim",
  description: "PETUNJUK PENGERJAAN:\n1. Jalankan aplikasi E-klaim pada laptop masing-masing.\n2. Inputlah kedalam aplikasi Eklaim (Identitas, Billing, Kode ICD).\n3. Tuliskan hasil grouping dari E-klaim yang sudah diinputkan pada kolom di bawah ini.\n4. Jika terjadi error grouping/ungroupable, maka identifikasilah permasalahan yang terjadi dan tuliskan alternatif solusinya.",
  cases: [
    {
      id: 1,
      title: "SOAL 1 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-1.pdf",
      questions: generateCaseQuestions(1)
    },
    {
      id: 2,
      title: "SOAL 2 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-2.pdf",
      questions: generateCaseQuestions(2)
    },
    {
      id: 3,
      title: "SOAL 3 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-3.pdf",
      questions: generateCaseQuestions(3)
    },
    {
      id: 4,
      title: "SOAL 4 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-4.pdf",
      questions: generateCaseQuestions(4)
    },
    {
      id: 5,
      title: "SOAL 5 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-5.pdf",
      questions: generateCaseQuestions(5)
    },
    {
      id: 6,
      title: "SOAL 6 - Trouble Shooting",
      pdfUrl: "/pdfs/mpi4-soal-6.pdf",
      questions: generateCaseQuestions(6)
    }
  ]
};
