/// <reference types="node" />
import { Agent } from "http";
export declare class FeederDikti {
    /**
     * Object yang berisi konfigurasi untuk melakukan request
     */
    options: FeederDikti.FeederOptions;
    /**
     * Token yang digunakan untuk melakukan request
     */
    token: string;
    constructor(options: FeederDikti.FeederOptions);
    /**
     * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
     * `act: "GetToken"`
     */
    getToken(): Promise<string>;
    /**
     * Mengambil data
     * @param action Jenis data yang ingin diambil
     * @param options Opsi dalam pengambilan data
     */
    get(action: FeederDikti.GetType, options?: FeederDikti.GetOptions): Promise<any>;
    /**
     * Menambahkan data
     * @param action Jenis data yang ingin ditambahkan
     * @param record Isi data yang ingin ditambahkan
     * @param options Opsi dalam penambahan data
     */
    insert<K extends FeederDikti.InsertType, T extends FeederDikti.InsertActionType>(action: K, record: T[K], options?: FeederDikti.InsertOptions): Promise<any>;
    /**
     * Memperbarui data
     * @param action Jenis data yang ingin diperbarui
     * @param key Key dari data yang ingin diperbarui
     * @param record Isi dari data yang ingin diperbarui
     * @param options Opsi dalam pembaruan data
     */
    update<K extends FeederDikti.UpdateType, T extends FeederDikti.UpdateActionType>(action: K, key: T[K]["key"], record: T[K]["record"], options?: FeederDikti.UpdateOptions): Promise<any>;
    /**
     * Menghapus data
     * @param action Jenis data yang ingin dihapus
     * @param key Key dari data yang ingin dihapus
     * @param options Opsi dalam penghapusan data
     */
    delete<T extends FeederDikti.DeleteActionType, K extends keyof FeederDikti.DeleteActionType>(action: K, key: T[K], options?: FeederDikti.DeleteOptions): Promise<any>;
}
export declare namespace FeederDikti {
    interface FeederOptions {
        host: string;
        username: string;
        password: string;
        endpoint?: string;
        agent?: Agent | ((parsedUrl: URL) => Agent);
    }
    type GetType = "Agama" | "AktivitasKuliahMahasiswa" | "AktivitasMengajarDosen" | "BentukPendidikan" | "BiodataMahasiswa" | "CountAktivitasMahasiswa" | "CountAktivitasMengajarDosen" | "CountDosen" | "CountDosenPembimbing" | "CountDosenPengajarKelasKuliah" | "CountKelasKuliah" | "CountKurikulum" | "CountMahasiswa" | "CountMahasiswaBimbinganDosen" | "CountMahasiswaLulusDO" | "CountMataKuliah" | "CountMatkulKurikulum" | "CountNilaiPerkuliahanKelas" | "CountNilaiTransferPendidikanMahasiswa" | "CountPenugasanSemuaDosen" | "CountPerguruanTinggi" | "CountPeriodePerkuliahan" | "CountPerkuliahanMahasiswa" | "CountPesertaKelasKuliah" | "CountPrestasiMahasiswa" | "CountProdi" | "CountRiwayatNilaiMahasiswa" | "CountRiwayatPendidikanMahasiswa" | "CountSkalaNilaiProdi" | "CountSubstansiKuliah" | "DataLengkapMahasiswaProdi" | "DetailBiodataDosen" | "DetailKelasKuliah" | "DetailKurikulum" | "DetailMataKuliah" | "DetailNilaiPerkuliahanKelas" | "DetailPerkuliahanMahasiswa" | "DosenPengajarKelasKuliah" | "IkatanKerjaSdm" | "Jabfung" | "JalurMasuk" | "JenisAktivitasMahasiswa" | "JenisEvaluasi" | "JenisKeluar" | "JenisPendaftaran" | "JenisPrestasi" | "JenisSertifikasi" | "JenisSMS" | "JenisSubstansi" | "JenisTinggal" | "JenjangPendidikan" | "KategoriKegiatan" | "KebutuhanKhusus" | "KRSMahasiswa" | "LembagaPengangkat" | "LevelWilayah" | "ListAktivitasMahasiswa" | "ListAnggotaAktivitasMahasiswa" | "ListBimbingMahasiswa" | "ListDosen" | "ListKelasKuliah" | "ListKurikulum" | "ListMahasiswa" | "ListMataKuliah" | "ListNilaiPerkuliahanKelas" | "ListPenugasanDosen" | "ListPenugasanSemuaDosen" | "ListPerkuliahanMahasiswa" | "ListPrestasiMahasiswa" | "ListPrestasiMahasiswa" | "ListRiwayatPendidikanMahasiswa" | "ListSubstansiKuliah" | "ListUjiMahasiswa" | "MahasiswaBimbinganDosen" | "MatkulKurikulum" | "Negara" | "NilaiTransferPendidikanMahasiswa" | "PangkatGolongan" | "Pekerjaan" | "Pembiayaan" | "Penghasilan" | "PerhitunganSKS" | "Periode" | "PesertaKelasKuliah" | "Prodi" | "ProfilPT" | "RiwayatFungsionalDosen" | "RiwayatNilaiMahasiswa" | "RiwayatPangkatDosen" | "RiwayatPendidikanDosen" | "RiwayatPenelitianDosen" | "RiwayatSertifikasiDosen" | "Semester" | "StatusKeaktifanPegawai" | "StatusKepegawaian" | "StatusMahasiswa" | "TahunAjaran" | "TingkatPrestasi" | "TranskripMahasiswa" | "Wilayah" | "AlatTransportasi";
    interface GetOptions {
        token?: string;
        filter?: string;
        limit?: number;
        offset?: number;
        order?: string;
    }
    type InsertType = "AktivitasMahasiswa" | "AnggotaAktivitasMahasiswa" | "BimbingMahasiswa" | "BiodataMahasiswa" | "DosenPengajarKelasKuliah" | "KelasKuliah" | "Kurikulum" | "MataKuliah" | "MatkulKurikulum" | "NilaiTransferPendidikanMahasiswa" | "PeriodePerkuliahan" | "PerkuliahanMahasiswa" | "PesertaKelasKuliah" | "PrestasiMahasiswa" | "RiwayatPendidikanMahasiswa" | "SubstansiKuliah" | "TranskripMahasiswa" | "UjiMahasiswa" | "MahasiswaLulusDO" | "DosenPembimbing" | "SkalaNilaiProdi" | "DayaTampungMahasiswa";
    interface InsertOptions {
        token?: string;
    }
    type InsertActionType = {
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
    type UpdateType = "BiodataMahasiswa" | "DosenPengajarKelasKuliah" | "KelasKuliah" | "Kurikulum" | "MataKuliah" | "NilaiPerkuliahanKelas" | "NilaiTransferPendidikanMahasiswa" | "PeriodePerkuliahan" | "PerkuliahanMahasiswa" | "PrestasiMahasiswa" | "RiwayatPendidikanMahasiswa" | "SubstansiKuliah";
    interface UpdateOptions {
        token?: string;
    }
    type UpdateActionType = {
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
    interface DeleteOptions {
        token?: string;
    }
    type DeleteType = "AktivitasMahasiswa" | "AnggotaAktivitasMahasiswa" | "BimbingMahasiswa" | "BiodataMahasiswa" | "DosenPengajarKelasKuliah" | "KelasKuliah" | "Kurikulum" | "MataKuliah" | "MatkulKurikulum" | "NilaiTransferPendidikanMahasiswa" | "PeriodePerkuliahan" | "PerkuliahanMahasiswa" | "PesertaKelasKuliah" | "PrestasiMahasiswa" | "RiwayatPendidikanMahasiswa" | "SubstansiKuliah" | "TranskripMahasiswa" | "UjiMahasiswa" | "MahasiswaLulusDO" | "DosenPembimbing" | "SkalaNilaiProdi" | "DayaTampungMahasiswa";
    type DeleteActionType = {
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
