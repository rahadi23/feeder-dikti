export type DetailMahasiswaLulusDO = {
  id_registrasi_mahasiswa: string;
  id_prodi: string;
  nama_program_studi: string;
  id_mahasiswa: string;
  nim: string;
  nama_mahasiswa: string;
  angkatan: string;
  id_jenis_keluar: string;
  nama_jenis_keluar: string;
  tanggal_keluar: string;
  keterangan?: string;
  nomor_sk_yudisium: string;
  tanggal_sk_yudisium: string;
  ipk: string;
  nomor_ijazah: string;
  jalur_skripsi: string;
  judul_skripsi: string;
  bulan_awal_bimbingan: string;
  bulan_akhir_bimbingan: string;
  id_dosen?: string;
  nidn?: string;
  nama_dosen?: string;
  pembimbing_ke?: string;
  asal_ijazah: string;
  id_periode_keluar?: string;
}