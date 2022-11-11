export type DetailMataKuliah = {
  id_matkul: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  id_prodi: string;
  nama_program_studi: string;
  id_jenis_mata_kuliah: string;
  id_kelompok_mata_kuliah: string;
  sks_mata_kuliah: string;
  sks_tatap_muka: string;
  sks_praktek: string;
  sks_praktek_lapangan: string;
  sks_simulasi: string;
  metode_kuliah: string;
  ada_sap: string;
  ada_silabus: string;
  ada_bahan_ajar: string;
  ada_acara_praktek: string;
  ada_diktat: string;
  tanggal_mulai_efektif?: string;
  tanggal_selesai_efektif?: string;
}