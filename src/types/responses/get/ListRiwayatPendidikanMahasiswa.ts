export type ListRiwayatPendidikanMahasiswa = {
  id_registrasi_mahasiswa: string;
  id_mahasiswa: string;
  nim: string;
  nama_mahasiswa: string;
  id_jenis_daftar: string;
  nama_jenis_daftar: string;
  id_jalur_daftar?: string;
  id_periode_masuk: string;
  nama_periode_masuk: string;
  tanggal_daftar: string;
  id_jenis_keluar: string;
  keterangan_keluar: string;
  id_perguruan_tinggi: string;
  nama_perguruan_tinggi: string;
  id_prodi: string;
  nama_program_studi: string;
  sks_diakui?: string;
  id_perguruan_tinggi_asal?: string;
  nama_perguruan_tinggi_asal?: string;
  id_prodi_asal?: string;
  nama_program_studi_asal?: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  nama_ibu_kandung: string;
  nama_ibu: string;
  id_pembiayaan?: string;
  nama_pembiayaan_awal?: string;
  biaya_masuk?: string;
  id_bidang_minat?: string;
  nm_bidang_minat?: string;
}