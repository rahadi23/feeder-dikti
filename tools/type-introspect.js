const { Agent } = require("https");
const fs = require("fs/promises");
const path = require("path");

const { FeederDikti } = require("../dist");
const constants = require("./constants");

if (process.argv.length <= 2) {
  console.error("Direktori harus ditentukan.");
  process.exit(1);
}

const config = {
  host: constants.host,
  username: constants.username,
  password: constants.password,
};

if (constants.disableCertCheck) {
  config.agent = new Agent({ rejectUnauthorized: false });
}

const api = new FeederDikti(config);

const actions = [
  "Agama",
  "AktivitasKuliahMahasiswa",
  "AktivitasMengajarDosen",
  "BentukPendidikan",
  "BiodataMahasiswa",
  "CountAktivitasMahasiswa",
  "CountAktivitasMengajarDosen",
  "CountDosen",
  "CountDosenPembimbing",
  "CountDosenPengajarKelasKuliah",
  "CountKelasKuliah",
  "CountKurikulum",
  "CountMahasiswa",
  "CountMahasiswaBimbinganDosen",
  "CountMahasiswaLulusDO",
  "CountMataKuliah",
  "CountMatkulKurikulum",
  "CountNilaiPerkuliahanKelas",
  "CountNilaiTransferPendidikanMahasiswa",
  "CountPenugasanSemuaDosen",
  "CountPerguruanTinggi",
  "CountPeriodePerkuliahan",
  "CountPerkuliahanMahasiswa",
  "CountPesertaKelasKuliah",
  "CountPrestasiMahasiswa",
  "CountProdi",
  "CountRiwayatNilaiMahasiswa",
  "CountRiwayatPendidikanMahasiswa",
  "CountSkalaNilaiProdi",
  "CountSubstansiKuliah",
  "DataLengkapMahasiswaProdi",
  "DetailBiodataDosen",
  "DetailKelasKuliah",
  "DetailKurikulum",
  "DetailMahasiswaLulusDO",
  "DetailMataKuliah",
  "DetailNilaiPerkuliahanKelas",
  "DetailPerkuliahanMahasiswa",
  "DosenPengajarKelasKuliah",
  "IkatanKerjaSdm",
  "Jabfung",
  "JalurMasuk",
  "JenisAktivitasMahasiswa",
  "JenisEvaluasi",
  "JenisKeluar",
  "JenisPendaftaran",
  "JenisPrestasi",
  "JenisSertifikasi",
  "JenisSMS",
  "JenisSubstansi",
  "JenisTinggal",
  "JenjangPendidikan",
  "KategoriKegiatan",
  "KebutuhanKhusus",
  "KRSMahasiswa",
  "LembagaPengangkat",
  "LevelWilayah",
  "ListAktivitasMahasiswa",
  "ListAnggotaAktivitasMahasiswa",
  "ListBimbingMahasiswa",
  "ListDosen",
  "ListKelasKuliah",
  "ListKurikulum",
  "ListMahasiswa",
  "ListMataKuliah",
  "ListNilaiPerkuliahanKelas",
  "ListPenugasanDosen",
  "ListPenugasanSemuaDosen",
  "ListPerkuliahanMahasiswa",
  "ListPrestasiMahasiswa",
  "ListRiwayatPendidikanMahasiswa",
  "ListSubstansiKuliah",
  "ListUjiMahasiswa",
  "MahasiswaBimbinganDosen",
  "MatkulKurikulum",
  "Negara",
  "NilaiTransferPendidikanMahasiswa",
  "PangkatGolongan",
  "Pekerjaan",
  "Pembiayaan",
  "Penghasilan",
  "PerhitunganSKS",
  "Periode",
  "PesertaKelasKuliah",
  "Prodi",
  "ProfilPT",
  "RiwayatFungsionalDosen",
  "RiwayatNilaiMahasiswa",
  "RiwayatPangkatDosen",
  "RiwayatPendidikanDosen",
  "RiwayatPenelitianDosen",
  "RiwayatSertifikasiDosen",
  "Semester",
  "StatusKeaktifanPegawai",
  "StatusKepegawaian",
  "StatusMahasiswa",
  "TahunAjaran",
  "TingkatPrestasi",
  "TranskripMahasiswa",
  "Wilayah",
  "AlatTransportasi",
];

(async () => {
  const argv = process.argv.slice(2);
  const dir = argv.pop();
  const includeSample = argv.find((r) => r === "--include-sample");

  const samples = await Promise.all(
    actions.map((a) => api.get(a, { limit: 1 }))
  );

  const result = samples.map((s, i) => {
    const result = {
      action: actions[i],
      result: includeSample ? `/* Sample: ${JSON.stringify(s)} */\n` : "",
    };
    if (s[0]) {
      if (typeof s[0] === "object") {
        const types = Object.entries(s[0]).map(([key, val]) => {
          let type = key;

          if (val === null) {
            type += "?: string;";
          } else {
            // if (
            //   !isNaN(Number(val)) &&
            //   val.trim().length > 0 &&
            //   !val.startsWith("0")
            // ) {
            //   type += `: number;`;
            // } else {
            type += `: ${typeof val};`;
            // }
          }

          return type;
        });

        result.result += `export type ${actions[i]} = {
  ${types.join("\r\n  ")}
}`;
      } else {
        result.result += `export type ${actions[i]} = ${typeof s[0]};`;
      }
    } else {
      result.result += `export type ${actions[i]} = {}`;
    }

    return result;
  });

  fs.mkdir(dir, { recursive: true });

  const write = Promise.all(
    result.map((r) => fs.writeFile(path.join(dir, `${r.action}.ts`), r.result))
  );
})();
