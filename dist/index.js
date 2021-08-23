"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const FeederDiktiResponse_1 = require("./objects/FeederDiktiResponse");
/**
 * Mendapatkan URL Endpoint
 */
function getEndpoint(host, endpoint) {
    return `${host}/${endpoint}`;
}
/**
 * Membuat body dengan method post dan data berupa json
 */
function createPostJsonBody(data, agent) {
    return {
        method: "post",
        body: JSON.stringify(Object.assign({ act: data.act }, data.body)),
        headers: { "Content-Type": "application/json" },
        agent: agent,
    };
}
class FeederDikti {
    constructor(options) {
        this.options = {
            host: "",
            username: "",
            password: "",
            endpoint: "ws/live2.php",
        };
        Object.assign(this.options, options);
    }
    /**
     * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
     * `act: "GetToken"`
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: "GetToken",
                    body: {
                        username: this.options.username,
                        password: this.options.password,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const creds = new FeederDiktiResponse_1.default(response);
                if (creds.data) {
                    this.token = creds.data.token;
                    return this.token;
                }
                throw creds.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Mengambil data
     * @param action Jenis data yang ingin diambil
     * @param options Opsi dalam pengambilan data
     */
    get(action, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: GetActions[action],
                    body: options,
                }, this.options.agent));
                const response = yield request.json();
                const result = new FeederDiktiResponse_1.default(response);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Menambahkan data
     * @param action Jenis data yang ingin ditambahkan
     * @param record Isi data yang ingin ditambahkan
     * @param options Opsi dalam penambahan data
     */
    insert(action, record, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: InsertActions[action],
                    body: {
                        token: options.token,
                        record,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new FeederDiktiResponse_1.default(response);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Memperbarui data
     * @param action Jenis data yang ingin diperbarui
     * @param key Key dari data yang ingin diperbarui
     * @param record Isi dari data yang ingin diperbarui
     * @param options Opsi dalam pembaruan data
     */
    update(action, key, record, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: UpdateActions[action],
                    body: {
                        token: options.token,
                        key,
                        record,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new FeederDiktiResponse_1.default(response);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Menghapus data
     * @param action Jenis data yang ingin dihapus
     * @param key Key dari data yang ingin dihapus
     * @param options Opsi dalam penghapusan data
     */
    delete(action, key, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: DeleteActions[action],
                    body: {
                        token: options.token,
                        key,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new FeederDiktiResponse_1.default(response);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.FeederDikti = FeederDikti;
const GetActions = {
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
    CountNilaiTransferPendidikanMahasiswa: "GetCountNilaiTransferPendidikanMahasiswa",
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
const InsertActions = {
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
const UpdateActions = {
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
const DeleteActions = {
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
