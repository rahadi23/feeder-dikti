export type InsertAction = {
  AktivitasMahasiswa: {
    jenis_anggota: number;
    id_jenis_aktivitas: number;
    id_prodi: string;
    id_semester: string;
    judul: string;
    keterangan?: string;
    lokasi?: string;
    sk_tugas?: string;
    tanggal_sk_tugas?: string;
  };

  AnggotaAktivitasMahasiswa: {
    id_aktivitas: string;
    id_registrasi_mahasiswa: string;
    jenis_peran: string;
  };

  BimbingMahasiswa: {
    id_aktivitas: string;
    id_kategori_kegiatan: number;
    id_dosen: string;
    pembimbing_ke: number;
  };

  BiodataMahasiswa: {
    nama_mahasiswa: string;
    jenis_kelamin: string;
    jalan?: string;
    rt?: number;
    rw?: number;
    dusun?: string;
    kelurahan: string;
    kode_pos: string;
    nisn?: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    nama_ayah: string;
    tanggal_lahir_ayah?: string;
    nik_ayah?: string;
    id_jenjang_pendidikan_ayah?: number;
    id_pekerjaan_ayah?: number;
    id_penghasilan_ayah?: number;
    id_kebutuhan_khusus_ayah?: number;
    nama_ibu_kandung: string;
    tanggal_lahir_ibu?: string;
    nik_ibu?: string;
    id_jenjang_pendidikan_ibu?: number;
    id_pekerjaan_ibu?: number;
    id_penghasilan_ibu?: number;
    id_kebutuhan_khusus_ibu?: number;
    nama_wali?: string;
    tanggal_lahir_wali?: string;
    id_jenjang_pendidikan_wali?: number;
    id_pekerjaan_wali?: number;
    id_penghasilan_wali?: number;
    id_kebutuhan_khusus_mahasiswa: number;
    telepon?: string;
    handphone?: string;
    email?: string;
    penerima_kps: number;
    no_kps?: string;
    npwp?: string;
    id_wilayah: string;
    id_jenis_tinggal?: number;
    id_agama: number;
    id_alat_transportasi?: number;
    kewarganegaraan: string;
  };

  DosenPengajarKelasKuliah: {
    id_registrasi_dosen: string;
    id_kelas_kuliah: string;
    id_substansi: string;
    sks_substansi_total: number;
    rencana_minggu_pertemuan: number;
    realisasi_minggu_pertemuan: number;
    id_jenis_evaluasi: number;
  };

  KelasKuliah: {
    id_prodi: string;
    id_semester: string;
    id_matkul: string;
    nama_kelas_kuliah: string;
    bahasan?: string;
    tanggal_mulai_efektif?: string;
    tanggal_akhir_efektif?: string;
  };

  Kurikulum: {
    nama_kurikulum: string;
    id_prodi: string;
    id_semester: string;
    jumlah_sks_lulus: number;
    jumlah_sks_wajib: number;
    jumlah_sks_pilihan: number;
  };

  MataKuliah: {
    id_prodi: string;
    kode_mata_kuliah: string;
    nama_mata_kuliah: string;
    id_jenis_mata_kuliah: string;
    id_kelompok_mata_kuliah: string;
    sks_mata_kuliah: number;
    sks_tatap_muka: number;
    sks_praktek: number;
    sks_praktek_lapangan: number;
    sks_simulasi: number;
    metode_kuliah: string;
    ada_sap: number;
    ada_silabus: number;
    ada_bahan_ajar: number;
    ada_acara_praktek: number;
    ada_diktat: number;
    tanggal_mulai_efektif: string;
    tanggal_akhir_efektif: string;
  };

  MatkulKurikulum: {
    id_kurikulum: string;
    id_matkul: string;
    semester: number;
    sks_mata_kuliah?: number;
    sks_praktek?: number;
    sks_praktek_lapangan?: number;
    sks_simulasi?: number;
    apakah_wajib?: number;
  };

  NilaiTransferPendidikanMahasiswa: {
    id_registrasi_mahasiswa: string;
    id_matkul: string;
    kode_mata_kuliah_asal: string;
    nama_mata_kuliah_asal: string;
    sks_mata_kuliah_asal: number;
    sks_mata_kuliah_diakui: number;
    nilai_huruf_asal: string;
    nilai_huruf_diakui: string;
    nilai_angka_diakui: number;
  };

  PeriodePerkuliahan: {
    id_prodi: string;
    id_semester: string;
    jumlah_target_mahasiswa_baru?: number;
    jumlah_pendaftar_ikut_seleksi?: number;
    jumlah_pendaftar_lulus_seleksi?: number;
    jumlah_daftar_ulang?: number;
    jumlah_mengundurkan_diri?: number;
    tanggal_awal_perkuliahan: string;
    tanggal_akhir_perkuliahan: string;
  };

  PerkuliahanMahasiswa: {
    id_registrasi_mahasiswa: string;
    id_semester: string;
    id_status_mahasiswa: string;
    ips?: number;
    ipk?: number;
    sks_semester?: number;
    total_sks?: number;
    biaya_kuliah_smt?: number;
  };

  PesertaKelasKuliah: {
    id_registrasi_mahasiswa: string;
    id_kelas_kuliah: string;
  };

  PrestasiMahasiswa: {
    id_mahasiswa: string;
    id_jenis_prestasi: number;
    id_tingkat_prestasi: number;
    nama_prestasi: string;
    tahun_prestasi: number;
    penyelenggara?: string;
    peringkat?: number;
  };

  RiwayatPendidikanMahasiswa: {
    id_mahasiswa: string;
    nim: string;
    id_jenis_daftar: number;
    id_jalur_daftar?: number;
    id_periode_masuk: string;
    tanggal_daftar: string;
    id_perguruan_tinggi: string;
    id_prodi: string;
    sks_diakui?: number;
    id_perguruan_tinggi_asal?: string;
    id_prodi_asal?: string;
    id_pembiayaan?: string;
  };

  SubstansiKuliah: {
    id_prodi: string;
    nama_substansi: string;
    sks_mata_kuliah: number;
    sks_tatap_muka: number;
    sks_praktek: number;
    sks_simulasi: number;
    sks_praktek_lapangan: number;
    id_jenis_substansi: string;
  };

  TranskripMahasiswa: {
    id_registrasi_mahasiswa: string;
    id_matkul: string;
    id_kelas_kuliah: string;
    id_nilai_transfer: string;
    smt_diambil: number;
  };

  UjiMahasiswa: {
    id_aktivitas: string;
    id_kategori_kegiatan: number;
    id_dosen: string;
    penguji_ke: number;
  };

  MahasiswaLulusDO: {
    id_registrasi_mahasiswa: string;
    id_jenis_keluar: string;
    tanggal_keluar?: string;
    keterangan?: string;
    nomor_sk_yudisium?: string;
    tanggal_sk_yudisium?: string;
    ipk?: number;
    nomor_ijazah?: string;
    jalur_skripsi?: number;
    judul_skripsi?: string;
    bulan_awal_bimbingan?: string;
    bulan_akhir_bimbingan?: string;
  };

  DosenPembimbing: {
    id_registrasi_mahasiswa: string;
    id_dosen: string;
    pembimbing_ke: number;
  };

  SkalaNilaiProdi: {
    id_prodi: string;
    nilai_huruf: string;
    nilai_indeks?: number;
    bobot_minimum: number;
    bobot_maksimum: number;
    tanggal_mulai_efektif: string;
    tanggal_akhir_efektif: string;
  };

  DayaTampungMahasiswa: {};
};
