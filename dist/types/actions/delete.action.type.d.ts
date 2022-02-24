export declare type DeleteAction = {
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
