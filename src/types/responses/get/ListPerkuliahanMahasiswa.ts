export type ListPerkuliahanMahasiswa = {
  id_registrasi_mahasiswa: string;
  nim: string;
  nama_mahasiswa: string;
  id_prodi: string;
  nama_program_studi: string;
  angkatan: string;
  id_periode_masuk: string;
  id_semester: string;
  nama_semester: string;
  id_status_mahasiswa: string;
  nama_status_mahasiswa: string;
  ips: string;
  ipk: string;
  sks_semester: string;
  sks_total: string;
  biaya_kuliah_smt?: string;
}