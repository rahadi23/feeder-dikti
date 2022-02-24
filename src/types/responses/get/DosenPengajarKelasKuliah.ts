export type DosenPengajarKelasKuliah = {
  id_aktivitas_mengajar: string;
  id_registrasi_dosen: string;
  id_dosen: string;
  nidn: string;
  nama_dosen: string;
  id_kelas_kuliah: string;
  nama_kelas_kuliah: string;
  id_substansi?: string;
  sks_substansi_total: string;
  rencana_minggu_pertemuan: string;
  realisasi_minggu_pertemuan?: string;
  id_jenis_evaluasi: string;
  nama_jenis_evaluasi: string;
  id_prodi: string;
  id_semester: string;
}