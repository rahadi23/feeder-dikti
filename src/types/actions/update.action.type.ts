export type UpdateAction = {
  BiodataMahasiswa: {
    key: {
      id_mahasiswa: string;
    };
    record: {
      nama_mahasiswa?: string;
      jenis_kelamin?: string;
      tempat_lahir?: string;
      tanggal_lahir?: string;
      id_agama?: string;
      nik?: string;
      nisn?: string;
      npwp?: string;
      kewarganegaraan?: string;
      jalan?: string;
      dusun?: string;
      rt?: number;
      rw?: number;
      kelurahan?: string;
      kode_pos?: string;
      id_wilayah?: string;
      id_jenis_tinggal?: number;
      id_alat_transportasi?: number;
      telepon?: string;
      handphone?: string;
      email?: string;
      penerima_kps?: number;
      nomor_kps?: string;
      nik_ayah?: string;
      nama_ayah?: string;
      tanggal_lahir_ayah?: string;
      id_pendidikan_ayah?: number;
      id_pekerjaan_ayah?: number;
      id_penghasilan_ayah?: number;
      nik_ibu?: string;
      nama_ibu_kandung?: string;
      tanggal_lahir_ibu?: string;
      id_pendidikan_ibu?: number;
      id_pekerjaan_ibu?: number;
      id_penghasilan_ibu?: number;
      nama_wali?: string;
      tanggal_lahir_wali?: string;
      id_pendidikan_wali?: number;
      id_pekerjaan_wali?: number;
      id_penghasilan_wali?: number;
      id_kebutuhan_khusus_mahasiswa?: number;
      id_kebutuhan_khusus_ayah?: number;
      id_kebutuhan_khusus_ibu?: number;
    };
  };

  DosenPengajarKelasKuliah: {
    key: {
      id_aktivitas_mengajar: string;
    };
    record: {
      id_registrasi_dosen?: string;
      id_kelas_kuliah?: string;
      id_substansi?: string;
      sks_substansi_total?: number;
      rencana_minggu_pertemuan?: number;
      realisasi_minggu_pertemuan?: number;
      id_jenis_evaluasi?: number;
    };
  };

  KelasKuliah: {
    key: {
      id_kelas_kuliah: string;
    };
    record: {
      id_prodi?: string;
      id_semester?: string;
      id_matkul?: string;
      nama_kelas_kuliah?: string;
      bahasan?: string;
      tanggal_mulai_efektif?: string;
      tanggal_akhir_efektif?: string;
    };
  };

  Kurikulum: {
    key: {
      id_kurikulum: string;
    };
    record: {
      nama_kurikulum?: string;
      id_prodi?: string;
      id_semester?: string;
      jumlah_sks_lulus?: number;
      jumlah_sks_wajib?: number;
      jumlah_sks_pilihan?: number;
    };
  };

  MataKuliah: {
    key: {
      id_matkul: string;
    };
    record: {
      id_prodi?: string;
      kode_mata_kuliah?: string;
      nama_mata_kuliah?: string;
      id_jenis_mata_kuliah?: string;
      id_kelompok_mata_kuliah?: string;
      sks_mata_kuliah?: number;
      sks_tatap_muka?: number;
      sks_praktek?: number;
      sks_praktek_lapangan?: number;
      sks_simulasi?: number;
      metode_kuliah?: string;
      ada_sap?: number;
      ada_silabus?: number;
      ada_bahan_ajar?: number;
      ada_acara_praktek?: number;
      ada_diktat?: number;
      tanggal_mulai_efektif?: string;
      tanggal_akhir_efektif?: string;
    };
  };

  NilaiPerkuliahanKelas: {
    key: {
      id_registrasi_mahasiswa: string;
      id_kelas_kuliah: string;
    };
    record: {
      nilai_angka?: number;
      nilai_indeks?: number;
      nilai_huruf?: number;
    };
  };

  NilaiTransferPendidikanMahasiswa: {
    key: {
      id_transfer: string;
    };
    record: {
      id_registrasi_mahasiswa?: string;
      kode_mata_kuliah_asal?: string;
      nama_mata_kuliah_asal?: string;
      sks_mata_kuliah_asal?: number;
      nilai_huruf_asal?: string;
      id_matkul?: string;
      sks_mata_kuliah_diakui?: number;
      nilai_angka_diakui?: number;
      nilai_huruf_diakui?: string;
    };
  };

  PeriodePerkuliahan: {
    key: {
      id_semester: string;
      id_prodi: string;
    };
    record: {
      jumlah_target_mahasiswa_baru?: number;
      jumlah_pendaftar_ikut_seleksi?: number;
      jumlah_pendaftar_lulus_seleksi?: number;
      jumlah_daftar_ulang?: number;
      jumlah_mengundurkan_diri?: number;
      tanggal_awal_perkuliahan?: string;
      tanggal_akhir_perkuliahan?: string;
    };
  };

  PerkuliahanMahasiswa: {
    key: {
      id_registrasi_mahasiswa: string;
      id_semester: string;
    };
    record: {
      id_status_mahasiswa?: string;
      ips?: number;
      ipk?: number;
      sks_semester?: number;
      total_sks?: number;
      biaya_kuliah_smt?: number;
    };
  };

  PrestasiMahasiswa: {
    key: {
      id_prestasi: string;
    };
    record: {
      id_mahasiswa?: string;
      id_jenis_prestasi?: number;
      id_tingkat_prestasi?: number;
      nama_prestasi?: string;
      tahun_prestasi?: number;
      penyelenggara?: string;
      peringkat?: number;
    };
  };

  RiwayatPendidikanMahasiswa: {
    key: {
      id_registrasi_mahasiswa: string;
    };
    record: {
      id_mahasiswa?: string;
      nim?: string;
      id_jenis_daftar?: number;
      id_jalur_daftar?: number;
      id_periode_masuk?: string;
      tanggal_daftar?: string;
      id_perguruan_tinggi?: string;
      id_prodi?: string;
      sks_diakui?: number;
      id_perguruan_tinggi_asal?: string;
      id_prodi_asal?: string;
      id_pembiayaan?: string;
    };
  };

  SubstansiKuliah: {
    key: {
      id_substansi: string;
    };
    record: {
      id_prodi?: string;
      nama_substansi?: string;
      sks_mata_kuliah?: number;
      sks_tatap_muka?: number;
      sks_praktek?: number;
      sks_simulasi?: number;
      sks_praktek_lapangan?: number;
      id_jenis_substansi?: string;
    };
  };
};
