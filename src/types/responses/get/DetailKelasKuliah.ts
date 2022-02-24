export type DetailKelasKuliah = {
  id_kelas_kuliah: string;
  id_prodi: string;
  nama_program_studi: string;
  id_semester: string;
  nama_semester: string;
  id_matkul: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  nama_kelas_kuliah: string;
  bahasan?: string;
  lingkup?: string;
  mode?: string;
  tanggal_mulai_efektif?: string;
  tanggal_akhir_efektif?: string;
  sks_mata_kuliah: string;
  sks_tatap_muka: string;
  sks_praktek: string;
  sks_praktek_lapangan: string;
  sks_simulasi: string;
  apa_untuk_pditt: string;
  kapasitas?: string;
  tanggal_tutup_daftar?: string;
  prodi_penyelenggara?: string;
  perguruan_tinggi_penyelenggara?: string;
}