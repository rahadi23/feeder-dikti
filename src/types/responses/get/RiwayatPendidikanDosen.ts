export type RiwayatPendidikanDosen = {
  id_dosen: string;
  nidn: string;
  nama_dosen: string;
  id_bidang_studi: string;
  nama_bidang_studi: string;
  id_jenjang_pendidikan: string;
  nama_jenjang_pendidikan: string;
  id_gelar_akademik: string;
  nama_gelar_akademik: string;
  id_perguruan_tinggi: string;
  nama_perguruan_tinggi: string;
  fakultas?: string;
  tahun_lulus: string;
  sks_lulus: string;
  ipk: string;
}