import fetch, { RequestInit } from "node-fetch";
import { Agent } from "http";

import FeederAPIResponse from "./objects/FeederDiktiResponse";

/**
 * Mendapatkan URL Endpoint
 */
function getEndpoint(host: string, endpoint: string): string {
  return `${host}/${endpoint}`;
}

/**
 * Membuat body dengan method post dan data berupa json
 */
function createPostJsonBody(
  data: { act: string; body: any },
  agent: Agent | ((parsedUrl: URL) => Agent)
): RequestInit {
  return {
    method: "post",
    body: JSON.stringify({ act: data.act, ...data.body }),
    headers: { "Content-Type": "application/json" },
    agent: agent,
  };
}

export class FeederDikti {
  /**
   * Object yang berisi konfigurasi untuk melakukan request
   */
  options: FeederDikti.FeederOptions;
  /**
   * Token yang digunakan untuk melakukan request
   */
  token: string;

  constructor(options: FeederDikti.FeederOptions) {
    this.options = {
      host: "",
      username: "",
      password: "",
      endpoint: "ws/live2.php",
    } as FeederDikti.FeederOptions;

    Object.assign(this.options, options);
  }

  /**
   * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
   * `act: "GetToken"`
   */
  async getToken() {
    try {
      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: "GetToken",
            body: {
              username: this.options.username,
              password: this.options.password,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const creds = new FeederAPIResponse(response);

      if (creds.data) {
        this.token = creds.data.token;
        return this.token;
      }

      throw creds.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Mengambil data
   * @param action Jenis data yang ingin diambil
   * @param options Opsi dalam pengambilan data
   */
  async get(action: FeederDikti.GetType, options: FeederDikti.GetOptions = {}) {
    try {
      if (!options || (options && !options.token)) {
        options.token = await this.getToken();
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: GetActions[action],
            body: options,
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new FeederAPIResponse(response);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Menambahkan data
   * @param action Jenis data yang ingin ditambahkan
   * @param record Isi data yang ingin ditambahkan
   * @param options Opsi dalam penambahan data
   */
  async insert<
    K extends FeederDikti.InsertType,
    T extends FeederDikti.InsertActionType
  >(action: K, record: T[K], options: FeederDikti.InsertOptions = {}) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: InsertActions[action],
            body: {
              token: options.token,
              record,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new FeederAPIResponse(response);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Memperbarui data
   * @param action Jenis data yang ingin diperbarui
   * @param key Key dari data yang ingin diperbarui
   * @param record Isi dari data yang ingin diperbarui
   * @param options Opsi dalam pembaruan data
   */
  async update<
    K extends FeederDikti.UpdateType,
    T extends FeederDikti.UpdateActionType
  >(
    action: K,
    key: T[K]["key"],
    record: T[K]["record"],
    options: FeederDikti.UpdateOptions = {}
  ) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: UpdateActions[action],
            body: {
              token: options.token,
              key,
              record,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new FeederAPIResponse(response);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Menghapus data
   * @param action Jenis data yang ingin dihapus
   * @param key Key dari data yang ingin dihapus
   * @param options Opsi dalam penghapusan data
   */
  async delete<
    T extends FeederDikti.DeleteActionType,
    K extends keyof FeederDikti.DeleteActionType
  >(action: K, key: T[K], options: FeederDikti.DeleteOptions = {}) {
    try {
      if (!options || (options && !options.token)) {
        if (!this.token) {
          await this.getToken();
        }

        options.token = this.token;
      }

      const request = await fetch(
        getEndpoint(this.options.host, this.options.endpoint),
        createPostJsonBody(
          {
            act: DeleteActions[action],
            body: {
              token: options.token,
              key,
            },
          },
          this.options.agent
        )
      );

      const response = await request.json();
      const result = new FeederAPIResponse(response);

      if (result.data) {
        return result.data;
      }

      throw result.error;
    } catch (err) {
      throw err;
    }
  }
}

const GetActions: { [key: string]: string } = {
  Agama: "GetAgama",
  AktivitasKuliahMahasiswa: "GetAktivitasKuliahMahasiswa",
  AktivitasMengajarDosen: "GetAktivitasMengajarDosen",
  BentukPendidikan: "GetBentukPendidikan",
  BiodataMahasiswa: "GetBiodataMahasiswa",
  CountAktivitasMahasiswa: "GetCountAktivitasMahasiswa",
  CountAktivitasMengajarDosen: "GetCountAktivitasMengajarDosen",
  CountDosen: "GetCountDosen",
  CountDosenPembimbing: "GetCountDosenPembimbing",
  CountDosenPengajarKelasKuliah: "GetCountDosenPengajarKelasKuliah",
  CountKelasKuliah: "GetCountKelasKuliah",
  CountKurikulum: "GetCountKurikulum",
  CountMahasiswa: "GetCountMahasiswa",
  CountMahasiswaBimbinganDosen: "GetCountMahasiswaBimbinganDosen",
  CountMahasiswaLulusDO: "GetCountMahasiswaLulusDO",
  CountMataKuliah: "GetCountMataKuliah",
  CountMatkulKurikulum: "GetCountMatkulKurikulum",
  CountNilaiPerkuliahanKelas: "GetCountNilaiPerkuliahanKelas",
  CountNilaiTransferPendidikanMahasiswa:
    "GetCountNilaiTransferPendidikanMahasiswa",
  CountPenugasanSemuaDosen: "GetCountPenugasanSemuaDosen",
  CountPerguruanTinggi: "GetCountPerguruanTinggi",
  CountPeriodePerkuliahan: "GetCountPeriodePerkuliahan",
  CountPerkuliahanMahasiswa: "GetCountPerkuliahanMahasiswa",
  CountPesertaKelasKuliah: "GetCountPesertaKelasKuliah",
  CountPrestasiMahasiswa: "GetCountPrestasiMahasiswa",
  CountProdi: "GetCountProdi",
  CountRiwayatNilaiMahasiswa: "GetCountRiwayatNilaiMahasiswa",
  CountRiwayatPendidikanMahasiswa: "GetCountRiwayatPendidikanMahasiswa",
  CountSkalaNilaiProdi: "GetCountSkalaNilaiProdi",
  CountSubstansiKuliah: "GetCountSubstansiKuliah",
  DataLengkapMahasiswaProdi: "GetDataLengkapMahasiswaProdi",
  DetailBiodataDosen: "DetailBiodataDosen",
  DetailKelasKuliah: "GetDetailKelasKuliah",
  DetailKurikulum: "GetDetailKurikulum",
  DetailMahasiswaLulusDO: "GetDetailMahasiswaLulusDO",
  DetailMataKuliah: "GetDetailMataKuliah",
  DetailNilaiPerkuliahanKelas: "GetDetailNilaiPerkuliahanKelas",
  DetailPerkuliahanMahasiswa: "GetDetailPerkuliahanMahasiswa",
  DosenPengajarKelasKuliah: "GetDosenPengajarKelasKuliah",
  IkatanKerjaSdm: "GetIkatanKerjaSdm",
  Jabfung: "GetJabfung",
  JalurMasuk: "GetJalurMasuk",
  JenisAktivitasMahasiswa: "GetJenisAktivitasMahasiswa",
  JenisEvaluasi: "GetJenisEvaluasi",
  JenisKeluar: "GetJenisKeluar",
  JenisPendaftaran: "GetJenisPendaftaran",
  JenisPrestasi: "GetJenisPrestasi",
  JenisSertifikasi: "GetJenisSertifikasi",
  JenisSMS: "GetJenisSMS",
  JenisSubstansi: "GetJenisSubstansi",
  JenisTinggal: "GetJenisTinggal",
  JenjangPendidikan: "GetJenjangPendidikan",
  KategoriKegiatan: "GetKategoriKegiatan",
  KebutuhanKhusus: "GetKebutuhanKhusus",
  KRSMahasiswa: "GetKRSMahasiswa",
  LembagaPengangkat: "GetLembagaPengangkat",
  LevelWilayah: "GetLevelWilayah",
  ListAktivitasMahasiswa: "GetListAktivitasMahasiswa",
  ListAnggotaAktivitasMahasiswa: "GetListAnggotaAktivitasMahasiswa",
  ListBimbingMahasiswa: "GetListBimbingMahasiswa",
  ListDosen: "GetListDosen",
  ListKelasKuliah: "GetListKelasKuliah",
  ListKurikulum: "GetListKurikulum",
  ListMahasiswa: "GetListMahasiswa",
  ListMataKuliah: "GetListMataKuliah",
  ListNilaiPerkuliahanKelas: "GetListNilaiPerkuliahanKelas",
  ListPenugasanDosen: "GetListPenugasanDosen",
  ListPenugasanSemuaDosen: "GetListPenugasanSemuaDosen",
  ListPerkuliahanMahasiswa: "GetListPerkuliahanMahasiswa",
  ListPrestasiMahasiswa: "GetListPrestasiMahasiswa",
  ListRiwayatPendidikanMahasiswa: "GetListRiwayatPendidikanMahasiswa",
  ListSubstansiKuliah: "GetListSubstansiKuliah",
  ListUjiMahasiswa: "GetListUjiMahasiswa",
  MahasiswaBimbinganDosen: "GetMahasiswaBimbinganDosen",
  MatkulKurikulum: "GetMatkulKurikulum",
  Negara: "GetNegara",
  NilaiTransferPendidikanMahasiswa: "GetNilaiTransferPendidikanMahasiswa",
  PangkatGolongan: "GetPangkatGolongan",
  Pekerjaan: "GetPekerjaan",
  Pembiayaan: "GetPembiayaan",
  Penghasilan: "GetPenghasilan",
  PerhitunganSKS: "GetPerhitunganSKS",
  Periode: "GetPeriode",
  PesertaKelasKuliah: "GetPesertaKelasKuliah",
  Prodi: "GetProdi",
  ProfilPT: "GetProfilPT",
  RiwayatFungsionalDosen: "GetRiwayatFungsionalDosen",
  RiwayatNilaiMahasiswa: "GetRiwayatNilaiMahasiswa",
  RiwayatPangkatDosen: "GetRiwayatPangkatDosen",
  RiwayatPendidikanDosen: "GetRiwayatPendidikanDosen",
  RiwayatPenelitianDosen: "GetRiwayatPenelitianDosen",
  RiwayatSertifikasiDosen: "GetRiwayatSertifikasiDosen",
  Semester: "GetSemester",
  StatusKeaktifanPegawai: "GetStatusKeaktifanPegawai",
  StatusKepegawaian: "GetStatusKepegawaian",
  StatusMahasiswa: "GetStatusMahasiswa",
  TahunAjaran: "GetTahunAjaran",
  TingkatPrestasi: "GetTingkatPrestasi",
  TranskripMahasiswa: "GetTranskripMahasiswa",
  Wilayah: "GetWilayah",
  AlatTransportasi: "GetAlatTransportasi",
};

const InsertActions: { [key: string]: string } = {
  AktivitasMahasiswa: "InsertAktivitasMahasiswa",
  AnggotaAktivitasMahasiswa: "InsertAnggotaAktivitasMahasiswa",
  BimbingMahasiswa: "InsertBimbingMahasiswa",
  BiodataMahasiswa: "InsertBiodataMahasiswa",
  DosenPengajarKelasKuliah: "InsertDosenPengajarKelasKuliah",
  KelasKuliah: "InsertKelasKuliah",
  Kurikulum: "InsertKurikulum",
  MataKuliah: "InsertMataKuliah",
  MatkulKurikulum: "InsertMatkulKurikulum",
  NilaiTransferPendidikanMahasiswa: "InsertNilaiTransferPendidikanMahasiswa",
  PeriodePerkuliahan: "InsertPeriodePerkuliahan",
  PerkuliahanMahasiswa: "InsertPerkuliahanMahasiswa",
  PesertaKelasKuliah: "InsertPesertaKelasKuliah",
  PrestasiMahasiswa: "InsertPrestasiMahasiswa",
  RiwayatPendidikanMahasiswa: "InsertRiwayatPendidikanMahasiswa",
  SubstansiKuliah: "InsertSubstansiKuliah",
  TranskripMahasiswa: "InsertTranskripMahasiswa",
  UjiMahasiswa: "InsertUjiMahasiswa",
  MahasiswaLulusDO: "InsertMahasiswaLulusDO",
  DosenPembimbing: "InsertDosenPembimbing",
  SkalaNilaiProdi: "InsertSkalaNilaiProdi",
  DayaTampungMahasiswa: "InsertDayaTampungMahasiswa",
};

const UpdateActions: { [key: string]: string } = {
  BiodataMahasiswa: "UpdateBiodataMahasiswa",
  DosenPengajarKelasKuliah: "UpdateDosenPengajarKelasKuliah",
  KelasKuliah: "UpdateKelasKuliah",
  Kurikulum: "UpdateKurikulum",
  MataKuliah: "UpdateMataKuliah",
  NilaiPerkuliahanKelas: "UpdateNilaiPerkuliahanKelas",
  NilaiTransferPendidikanMahasiswa: "UpdateNilaiTransferPendidikanMahasiswa",
  PeriodePerkuliahan: "UpdatePeriodePerkuliahan",
  PerkuliahanMahasiswa: "UpdatePerkuliahanMahasiswa",
  PrestasiMahasiswa: "UpdatePrestasiMahasiswa",
  RiwayatPendidikanMahasiswa: "UpdateRiwayatPendidikanMahasiswa",
  SubstansiKuliah: "UpdateSubstansiKuliah",
};

const DeleteActions: { [key: string]: string } = {
  AktivitasMahasiswa: "DeleteAktivitasMahasiswa",
  AnggotaAktivitasMahasiswa: "DeleteAnggotaAktivitasMahasiswa",
  BimbingMahasiswa: "DeleteBimbingMahasiswa",
  BiodataMahasiswa: "DeleteBiodataMahasiswa",
  DosenPengajarKelasKuliah: "DeleteDosenPengajarKelasKuliah",
  KelasKuliah: "DeleteKelasKuliah",
  Kurikulum: "DeleteKurikulum",
  MataKuliah: "DeleteMataKuliah",
  MatkulKurikulum: "DeleteMatkulKurikulum",
  NilaiTransferPendidikanMahasiswa: "DeleteNilaiTransferPendidikanMahasiswa",
  PeriodePerkuliahan: "DeletePeriodePerkuliahan",
  PerkuliahanMahasiswa: "DeletePerkuliahanMahasiswa",
  PesertaKelasKuliah: "DeletePesertaKelasKuliah",
  PrestasiMahasiswa: "DeletePrestasiMahasiswa",
  RiwayatPendidikanMahasiswa: "DeleteRiwayatPendidikanMahasiswa",
  SubstansiKuliah: "DeleteSubstansiKuliah",
  TranskripMahasiswa: "DeleteTranskripMahasiswa",
  UjiMahasiswa: "DeleteUjiMahasiswa",
  MahasiswaLulusDO: "DeleteMahasiswaLulusDO",
  DosenPembimbing: "DeleteDosenPembimbing",
  SkalaNilaiProdi: "DeleteSkalaNilaiProdi",
  DayaTampungMahasiswa: "DeleteDayaTampungMahasiswa",
};

export namespace FeederDikti {
  export interface FeederOptions {
    host: string;
    username: string;
    password: string;
    endpoint?: string;
    agent?: Agent | ((parsedUrl: URL) => Agent);
  }

  export type GetType =
    | "Agama"
    | "AktivitasKuliahMahasiswa"
    | "AktivitasMengajarDosen"
    | "BentukPendidikan"
    | "BiodataMahasiswa"
    | "CountAktivitasMahasiswa"
    | "CountAktivitasMengajarDosen"
    | "CountDosen"
    | "CountDosenPembimbing"
    | "CountDosenPengajarKelasKuliah"
    | "CountKelasKuliah"
    | "CountKurikulum"
    | "CountMahasiswa"
    | "CountMahasiswaBimbinganDosen"
    | "CountMahasiswaLulusDO"
    | "CountMataKuliah"
    | "CountMatkulKurikulum"
    | "CountNilaiPerkuliahanKelas"
    | "CountNilaiTransferPendidikanMahasiswa"
    | "CountPenugasanSemuaDosen"
    | "CountPerguruanTinggi"
    | "CountPeriodePerkuliahan"
    | "CountPerkuliahanMahasiswa"
    | "CountPesertaKelasKuliah"
    | "CountPrestasiMahasiswa"
    | "CountProdi"
    | "CountRiwayatNilaiMahasiswa"
    | "CountRiwayatPendidikanMahasiswa"
    | "CountSkalaNilaiProdi"
    | "CountSubstansiKuliah"
    | "DataLengkapMahasiswaProdi"
    | "DetailBiodataDosen"
    | "DetailKelasKuliah"
    | "DetailKurikulum"
    | "DetailMahasiswaLulusDO"
    | "DetailMataKuliah"
    | "DetailNilaiPerkuliahanKelas"
    | "DetailPerkuliahanMahasiswa"
    | "DosenPengajarKelasKuliah"
    | "IkatanKerjaSdm"
    | "Jabfung"
    | "JalurMasuk"
    | "JenisAktivitasMahasiswa"
    | "JenisEvaluasi"
    | "JenisKeluar"
    | "JenisPendaftaran"
    | "JenisPrestasi"
    | "JenisSertifikasi"
    | "JenisSMS"
    | "JenisSubstansi"
    | "JenisTinggal"
    | "JenjangPendidikan"
    | "KategoriKegiatan"
    | "KebutuhanKhusus"
    | "KRSMahasiswa"
    | "LembagaPengangkat"
    | "LevelWilayah"
    | "ListAktivitasMahasiswa"
    | "ListAnggotaAktivitasMahasiswa"
    | "ListBimbingMahasiswa"
    | "ListDosen"
    | "ListKelasKuliah"
    | "ListKurikulum"
    | "ListMahasiswa"
    | "ListMataKuliah"
    | "ListNilaiPerkuliahanKelas"
    | "ListPenugasanDosen"
    | "ListPenugasanSemuaDosen"
    | "ListPerkuliahanMahasiswa"
    | "ListPrestasiMahasiswa"
    | "ListPrestasiMahasiswa"
    | "ListRiwayatPendidikanMahasiswa"
    | "ListSubstansiKuliah"
    | "ListUjiMahasiswa"
    | "MahasiswaBimbinganDosen"
    | "MatkulKurikulum"
    | "Negara"
    | "NilaiTransferPendidikanMahasiswa"
    | "PangkatGolongan"
    | "Pekerjaan"
    | "Pembiayaan"
    | "Penghasilan"
    | "PerhitunganSKS"
    | "Periode"
    | "PesertaKelasKuliah"
    | "Prodi"
    | "ProfilPT"
    | "RiwayatFungsionalDosen"
    | "RiwayatNilaiMahasiswa"
    | "RiwayatPangkatDosen"
    | "RiwayatPendidikanDosen"
    | "RiwayatPenelitianDosen"
    | "RiwayatSertifikasiDosen"
    | "Semester"
    | "StatusKeaktifanPegawai"
    | "StatusKepegawaian"
    | "StatusMahasiswa"
    | "TahunAjaran"
    | "TingkatPrestasi"
    | "TranskripMahasiswa"
    | "Wilayah"
    | "AlatTransportasi";

  export interface GetOptions {
    token?: string;
    filter?: string;
    limit?: number;
    offset?: number;
    order?: string;
  }

  export type InsertType =
    | "AktivitasMahasiswa"
    | "AnggotaAktivitasMahasiswa"
    | "BimbingMahasiswa"
    | "BiodataMahasiswa"
    | "DosenPengajarKelasKuliah"
    | "KelasKuliah"
    | "Kurikulum"
    | "MataKuliah"
    | "MatkulKurikulum"
    | "NilaiTransferPendidikanMahasiswa"
    | "PeriodePerkuliahan"
    | "PerkuliahanMahasiswa"
    | "PesertaKelasKuliah"
    | "PrestasiMahasiswa"
    | "RiwayatPendidikanMahasiswa"
    | "SubstansiKuliah"
    | "TranskripMahasiswa"
    | "UjiMahasiswa"
    | "MahasiswaLulusDO"
    | "DosenPembimbing"
    | "SkalaNilaiProdi"
    | "DayaTampungMahasiswa";

  export interface InsertOptions {
    token?: string;
  }

  export type InsertActionType = {
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

  export type UpdateType =
    | "BiodataMahasiswa"
    | "DosenPengajarKelasKuliah"
    | "KelasKuliah"
    | "Kurikulum"
    | "MataKuliah"
    | "NilaiPerkuliahanKelas"
    | "NilaiTransferPendidikanMahasiswa"
    | "PeriodePerkuliahan"
    | "PerkuliahanMahasiswa"
    | "PrestasiMahasiswa"
    | "RiwayatPendidikanMahasiswa"
    | "SubstansiKuliah";

  export interface UpdateOptions {
    token?: string;
  }

  export type UpdateActionType = {
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

  export interface DeleteOptions {
    token?: string;
  }

  export type DeleteType =
    | "AktivitasMahasiswa"
    | "AnggotaAktivitasMahasiswa"
    | "BimbingMahasiswa"
    | "BiodataMahasiswa"
    | "DosenPengajarKelasKuliah"
    | "KelasKuliah"
    | "Kurikulum"
    | "MataKuliah"
    | "MatkulKurikulum"
    | "NilaiTransferPendidikanMahasiswa"
    | "PeriodePerkuliahan"
    | "PerkuliahanMahasiswa"
    | "PesertaKelasKuliah"
    | "PrestasiMahasiswa"
    | "RiwayatPendidikanMahasiswa"
    | "SubstansiKuliah"
    | "TranskripMahasiswa"
    | "UjiMahasiswa"
    | "MahasiswaLulusDO"
    | "DosenPembimbing"
    | "SkalaNilaiProdi"
    | "DayaTampungMahasiswa";

  export type DeleteActionType = {
    AktivitasMahasiswa: {
      id_aktivitas: string;
      id_prodi: string;
      id_semester: string;
    };

    AnggotaAktivitasMahasiswa: {
      id_anggota: string;
    };

    BimbingMahasiswa: {
      id_bimbing_mahasiswa: string;
    };

    BiodataMahasiswa: {
      id_mahasiswa: string;
    };

    DosenPengajarKelasKuliah: {
      id_aktivitas_mengajar: string;
    };

    KelasKuliah: {
      id_kelas_kuliah: string;
    };

    Kurikulum: {
      id_kurikulum: string;
    };

    MataKuliah: {
      id_matkul: string;
    };

    MatkulKurikulum: {
      id_kurikulum: string;
      id_matkul: string;
    };

    NilaiTransferPendidikanMahasiswa: {
      id_transfer: string;
    };

    PeriodePerkuliahan: {
      id_prodi: string;
      id_semester: string;
    };

    PerkuliahanMahasiswa: {
      id_registrasi_mahasiswa: string;
      id_semester: string;
    };

    PesertaKelasKuliah: {
      id_registrasi_mahasiswa: string;
      id_kelas_kuliah: string;
    };

    PrestasiMahasiswa: {
      id_prestasi: string;
    };

    RiwayatPendidikanMahasiswa: {
      id_registrasi_mahasiswa: string;
    };

    SubstansiKuliah: {
      id_substansi: string;
    };

    TranskripMahasiswa: {
      id_registrasi_mahasiswa: string;
      id_matkul: string;
    };

    UjiMahasiswa: {
      id_uji: string;
    };

    MahasiswaLulusDO: {
      id_registrasi_mahasiswa: string;
    };

    DosenPembimbing: {
      id_registrasi_mahasiswa: string;
      id_dosen: string;
    };

    SkalaNilaiProdi: {
      id_bobot_nilai: string;
    };

    DayaTampungMahasiswa: {};
  };
}
