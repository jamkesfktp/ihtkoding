export const quizQuestions = [
  {
    id: 1,
    question: "Kepanjangan dari JKN adalah...",
    options: ["Jaminan Keselamatan Negara", "Jaringan Kesehatan Nasional", "Jaminan Kesejahteraan Nasional", "Jaminan Kesehatan Nusantara", "Jaminan Kesehatan Nasional"],
    answer: "Jaminan Kesehatan Nasional"
  },
  {
    id: 2,
    question: "Standar klasifikasi internasional yang digunakan untuk menentukan kode diagnosis penyakit pasien di rumah sakit dalam program JKN adalah...",
    options: ["ICD-9-CM", "ICD-10", "ICD-11", "INA-CBG", "SNOMED CT"],
    answer: "ICD-10"
  },
  {
    id: 3,
    question: "Sedangkan standar klasifikasi yang digunakan untuk mengkodekan tindakan atau prosedur medis yang diberikan kepada pasien adalah...",
    options: ["ICD-10", "ICD-11", "ICD-9-CM", "E-Klaim", "Formularium Nasional"],
    answer: "ICD-9-CM"
  },
  {
    id: 4,
    question: "Sistem pembayaran klaim ke rumah sakit (Fasilitas Kesehatan Rujukan Tingkat Lanjut/FKRTL) yang menerapkan sistem paket berdasarkan pengelompokan diagnosis dan tindakan pasien dikenal dengan istilah...",
    options: ["Fee for Service", "Out of Pocket", "Kapitasi", "INA-CBG / iDRG", "Co-sharing"],
    answer: "INA-CBG / iDRG"
  },
  {
    id: 5,
    question: "Dokumen dan sumber informasi utama paling valid yang digunakan oleh seorang koder untuk menentukan kode diagnosis dan tindakan adalah...",
    options: ["Resep obat dari bagian farmasi", "Kuitansi pembayaran pasien", "Rekam Medis pasien (termasuk resume medis)", "Surat pengantar rujukan dari faskes pertama", "Jadwal praktik dokter"],
    answer: "Rekam Medis pasien (termasuk resume medis)"
  },
  {
    id: 6,
    question: "Dalam proses input data pada aplikasi E-Klaim, terkadang muncul peringatan (warning) \"Ungroupable\". Apa arti utama dari status tersebut?",
    options: ["Berkas klaim telah disetujui dan siap untuk dibayar", "Pasien tidak memiliki kepesertaan jaminan BPJS yang aktif", "Data klaim tidak dapat dikelompokkan ke dalam tarif paket INA-CBG akibat ada ketidaksesuaian/kekurangan data", "Rumah sakit belum memasukkan data administrasi pasien baru", "Sistem sedang mengalami gangguan koneksi internet"],
    answer: "Data klaim tidak dapat dikelompokkan ke dalam tarif paket INA-CBG akibat ada ketidaksesuaian/kekurangan data"
  },
  {
    id: 7,
    question: "Lembaga/badan yang berwenang melakukan proses verifikasi terhadap klaim yang diajukan oleh rumah sakit dalam program JKN adalah...",
    options: ["Kementerian Kesehatan", "Dinas Kesehatan Daerah", "BPJS Kesehatan", "Ikatan Dokter Indonesia (IDI)", "Dewan Pengawas Rumah Sakit"],
    answer: "BPJS Kesehatan"
  },
  {
    id: 8,
    question: "Salah satu tujuan utama dari kegiatan analisis rekam medis sebelum dilakukan proses koding oleh koder adalah untuk...",
    options: ["Memastikan rekam medis terisi dengan lengkap, akurat, konsisten, dan dapat dipertanggungjawabkan", "Mengubah diagnosis pasien agar klaim rumah sakit menjadi lebih besar", "Menghapus tindakan medis yang tidak ditanggung oleh asuransi", "Mencari kesalahan perawat dan dokter dalam menangani pasien", "Mempercepat waktu kepulangan pasien dari rumah sakit"],
    answer: "Memastikan rekam medis terisi dengan lengkap, akurat, konsisten, dan dapat dipertanggungjawabkan"
  },
  {
    id: 9,
    question: "Salah satu pilar Transformasi Sistem Kesehatan di Indonesia yang terkait langsung dengan peningkatan mutu layanan kesehatan di rumah sakit (FKRTL) adalah...",
    options: ["Transformasi Layanan Transportasi", "Transformasi Layanan Rujukan", "Transformasi Layanan Pendidikan", "Transformasi Ekonomi Kesehatan", "Transformasi Perdagangan Alat Kesehatan"],
    answer: "Transformasi Layanan Rujukan"
  },
  {
    id: 10,
    question: "Apabila koder menemukan tulisan diagnosis dokter di resume medis yang kurang jelas atau menggunakan singkatan yang tidak standar, tindakan paling tepat yang harus dilakukan koder adalah...",
    options: ["Mencari kode yang paling mendekati saja di dalam buku ICD-10", "Bertanya kepada sesama koder untuk menebak tulisan tersebut bersama-sama", "Langsung melakukan koding berdasarkan asumsi sendiri agar pekerjaan cepat selesai", "Mengabaikan dan tidak mengkode diagnosis tersebut agar tidak menjadi masalah klaim", "Melakukan konfirmasi atau klarifikasi secara langsung kepada dokter penanggung jawab pelayanan (DPJP) terkait"],
    answer: "Melakukan konfirmasi atau klarifikasi secara langsung kepada dokter penanggung jawab pelayanan (DPJP) terkait"
  },
  {
    id: 11,
    question: "(ICD-10 Aturan Dasar) Aturan (Rule) MB1 pada tata cara koding Morbiditas ICD-10 digunakan ketika...",
    options: ["Kondisi utama yang ditegakkan tidak sesuai dengan gejala", "Kondisi minor dicatat sebagai 'kondisi utama', padahal ada kondisi lain yang lebih bermakna yang ditangani", "Pasien meninggal dunia sebelum mendapatkan perawatan", "Koder tidak bisa membaca tulisan dokter", "Ada dua penyakit yang memiliki kode sama"],
    answer: "Kondisi minor dicatat sebagai 'kondisi utama', padahal ada kondisi lain yang lebih bermakna yang ditangani"
  },
  {
    id: 12,
    question: "Struktur buku ICD-9-CM yang khusus memuat klasifikasi untuk tindakan atau prosedur medis berada pada bagian...",
    options: ["Volume 1", "Volume 2", "Volume 3", "Volume 4", "Indeks Alfabetis Penyakit"],
    answer: "Volume 3"
  },
  {
    id: 13,
    question: "Review terhadap kelengkapan pengisian form resume medis (termasuk tanda tangan dokter/DPJP) merupakan bagian dari kegiatan...",
    options: ["Assembling Rekam Medis", "Analisis Kuantitatif Rekam Medis", "Retensi Rekam Medis", "Pemusnahan Rekam Medis", "Distribusi Rekam Medis"],
    answer: "Analisis Kuantitatif Rekam Medis"
  },
  {
    id: 14,
    question: "Dalam sistem grup INA-CBG, tingkat keparahan (severity level) penyakit pasien dikategorikan menjadi beberapa tingkat. Tingkat III menunjukkan tingkat keparahan...",
    options: ["Ringan", "Sedang", "Berat (Mayor)", "Tanpa komplikasi", "Tidak dapat dinilai"],
    answer: "Berat (Mayor)"
  },
  {
    id: 15,
    question: "Salah satu penyebab sebuah berkas klaim dapat dikembalikan (Pending) oleh verifikator BPJS adalah...",
    options: ["Pasien pulang atas izin dokter dan sembuh", "Tagihan sudah sesuai dengan kelas perawatan pasien", "Terdapat ketidaksesuaian antara kode diagnosis dengan bukti rekam medis (seperti hasil lab atau tindakan)", "Resume medis sudah ditandatangani oleh DPJP secara lengkap", "Kartu BPJS pasien terverifikasi aktif saat dirawat"],
    answer: "Terdapat ketidaksesuaian antara kode diagnosis dengan bukti rekam medis (seperti hasil lab atau tindakan)"
  },
  {
    id: 16,
    question: "(Kebijakan JKN) Rencana penerapan Kelas Rawat Inap Standar (KRIS) dalam program JKN merupakan wujud dari upaya untuk...",
    options: ["Mengurangi jumlah tenaga dokter spesialis di RS", "Menurunkan mutu pelayanan faskes secara sengaja", "Meningkatkan efisiensi dan mewujudkan keadilan (ekuitas) layanan bagi seluruh peserta JKN", "Menghapus program asuransi kesehatan swasta", "Mewajibkan pasien membayar iuran tambahan untuk obat"],
    answer: "Meningkatkan efisiensi dan mewujudkan keadilan (ekuitas) layanan bagi seluruh peserta JKN"
  },
  {
    id: 17,
    question: "Jika seorang pasien dirawat karena menderita Diabetes Mellitus tipe 2 dan mengalami komplikasi Gagal Ginjal Kronik (Chronic Kidney Disease), panduan koding yang benar berdasarkan ICD-10 adalah...",
    options: ["Mengkode gagal ginjal saja sebagai kondisi utama", "Mengkode penyakit yang membutuhkan biaya paling murah", "Mengkode diabetes mellitus serta gagal ginjal secara komprehensif sebagai kesatuan penyakit utama dan komplikasinya", "Menggabungkan kedua penyakit dalam satu kode sembarangan tanpa indeks", "Hanya mengkode tindakan cuci darahnya saja"],
    answer: "Mengkode diabetes mellitus serta gagal ginjal secara komprehensif sebagai kesatuan penyakit utama dan komplikasinya"
  },
  {
    id: 18,
    question: "Manfaat utama dilakukannya kegiatan analisis kuantitatif dan kualitatif pada dokumen rekam medis sebelum diajukan dalam proses E-Klaim adalah...",
    options: ["Mencari kesalahan diagnosis dari dokter", "Mencegah terjadinya klaim pending atau dispute akibat berkas yang tidak lengkap/tidak sesuai", "Membuat pasien menyampaikan keluhan komplain", "Mengurangi beban staf rekam medis", "Memperbanyak tumpukan kertas laporan"],
    answer: "Mencegah terjadinya klaim pending atau dispute akibat berkas yang tidak lengkap/tidak sesuai"
  },
  {
    id: 19,
    question: "Jika saat koding di E-Klaim muncul status \"Ungroupable\" karena data berat badan lahir (BBL) bayi tidak terisi pada kasus perawatan perinatologi, langkah penyelesaian yang tepat adalah...",
    options: ["Mengubah usia pasien menjadi dewasa", "Memasukkan angka berat badan fiktif/acak", "Mengecek rekam medis dan melengkapi isian berat badan lahir yang benar pada aplikasi E-Klaim", "Menghapus data klaim bayi tersebut agar tidak menghambat klaim lain", "Langsung mencetak tagihan tanpa tarif"],
    answer: "Mengecek rekam medis dan melengkapi isian berat badan lahir yang benar pada aplikasi E-Klaim"
  },
  {
    id: 20,
    question: "Karakter keempat dalam penulisan kode ICD-10 (contohnya A09.0 atau E11.2) umumnya digunakan untuk menunjukkan informasi tentang...",
    options: ["Bab besar klasifikasi penyakit", "Detail spesifik tambahan terkait letak anatomi, agen penyebab, atau komplikasi", "Nama dokter spesialis yang merawat", "Tahun kejadian penyakit tersebut ditemukan", "Jumlah tagihan biaya perawatan pasien"],
    answer: "Detail spesifik tambahan terkait letak anatomi, agen penyebab, atau komplikasi"
  }
];
