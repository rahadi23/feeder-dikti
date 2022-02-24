export type DetailNilaiPerkuliahanKelas = {
  id_prodi: string;
  nama_program_studi: string;
  id_semester: string;
  nama_semester: string;
  id_matkul: string;
  kode_mata_kuliah: string;
  nama_mata_kuliah: string;
  sks_mata_kuliah: string;
  id_kelas_kuliah: string;
  nama_kelas_kuliah: string;
  id_registrasi_mahasiswa: string;
  id_mahasiswa: string;
  nim: string;
  nama_mahasiswa: string;
  jurusan: string;
  angkatan: string;
  nilai_angka?: string;
  nilai_indeks?: string;
  nilai_huruf?: string;
}