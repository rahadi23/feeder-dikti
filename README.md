# Feeder Dikti

API dari Endpoint untuk melakukan operasi Create, Read, Update, dan Delete (CRUD) pada Web Pelaporan Feeder Pangkalan Data Pendidikan Tinggi (PDDikti)

## Daftar Isi

- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
  - [Options](#options)
  - [Request](#request)
    - [Get Token (`getToken()`)](#get-token-gettoken)
    - [Get (`get()`)](#get-getaction-options)
    - [Insert (`insert()`)](#insert-insertaction-record-options)
    - [Update (`update()`)](#update-updateaction-key-record-options)
    - [Delete (`delete()`)](#delete-deleteaction-key-options)
  - [Response](#response)
- [Troubleshooting](#troubleshooting)

## Instalasi

API ini baru tersedia di [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages). Hal pertama yang harus dilakukan untuk dapat menginstal API ini adalah dengan login terlebih dahulu ke GitHub dengan menggunakan **Personal Access Token**.

> Personal Access Token (PAT) dapat digenerate dari menu `Settings > Developer Settings > Personal access tokens`.

Setelah PAT digenerate, autentikasi dapat dilakukan pada npm dengan salah satu dari cara berikut:

### Menambahkan pada `.npmrc`

1. Buka file `~/.npmrc` atau buat baru apabila belum ada

2. Tambahkan konten berikut (ganti `TOKEN` dengan PAT yang telah digenerate sebelumnya):

```conf
//npm.pkg.github.com/:_authToken=TOKEN
```

### Menjalankan perintah `npm login`

1. Buka Terminal dan jalankan perintah berikut:

```bash
npm login --scope=@rahadi23 --registry=https://npm.pkg.github.com
```

2. Pada isian `Username`, isikan **username GitHub**

3. Pada isian `Password`, isikan **PAT yang telah digenerate sebelumnya**

4. Pada isian `Email`, isikan **Email public yang biasa digunakan**

Setelah proses autentikasi selesai, maka API dapat diinstal dengan menggunakan perintah berikut:

```bash
npm install @rahadi23/feeder-dikti
```

# Penggunaan

Untuk mulai menggunakan API ini, buat instance baru sebagai berikut:

```js
const { FeederDikti } = require("@rahadi23/feeder-dikti");
const feeder = new FeederDikti(options);
```

## Options

Inisiasi instance baru `FeederDikti` menerima beberapa pengaturan sebagai berikut:

| Option     |  Type  | Required | Default        | Keterangan                                                                                                                                                                                     |
| ---------- | :----: | :------: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`     | String |    Ya    | `null`         | Alamat host dari Web Feeder Dikti, lengkap dengan protokolnya (`http://` atau `https://`).                                                                                                     |
| `username` | String |    Ya    | `null`         | Username yang digunakan untuk masuk ke Feeder Dikti.                                                                                                                                           |
| `password` | String |    Ya    | `null`         | Password yang digunakan untuk masuk ke Feeder Dikti.                                                                                                                                           |
| `endpoint` | String |  Tidak   | `ws/live2.php` | Path endpoint dari Web Feeder Dikti (tanpa awalan `/`).                                                                                                                                        |
| `agent`    | Agent  |  Tidak   | `null`         | Agent yang digunakan untuk melakukan koneksi ke Feeder Dikti. Dapat berupa `Agent` atau `function(parsedURL)` di mana `parsedURL` adalah URL host yang telah diparsing, yang mereturn `Agent`. |

Contoh inisiasi:

```js
const feeder = new FeederDikti({
  host: "http://localhost:8000",
  username: "admin",
  password: "passwordKuatAdmin123#",
});
```

## Request

Terdapat 5 fungsi utama yang digunakan untuk melakukan request sebagai berikut:

### Get Token (`getToken()`)

Fungsi ini digunakan untuk mendapatkan token. Token ini akan digunakan untuk autentikasi dan otorisasi request-request lainnya.

#### Contoh:

```js
feeder.getToken();
```

### Get (`get(action, options)`)

Fungsi ini digunakan untuk mendapatkan data dari `action` yang dinginkan.

#### Parameter

- `action`: String action dari data yang ingin didapatkan. Misalnya: "Agama", "Prodi", "DetailKurikulum", "ListMataKuliah", dll.
- `options`: Object pengaturan yang digunakan dalam mendapatkan data. Lebih lanjut dijelaskan di bawah ini.

#### Options

| Option   |  Type  | Required | Default | Keterangan                                                                                                                                                                                                                                                                                                     |
| -------- | :----: | :------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`  | String |  Tidak   | `null`  | Token yang digunakan untuk autentikasi dan otorisasi request. Dapat diperoleh dari fungsi `getToken()`. **Apabila variable ini tidak diterapkan, maka fungsi `getToken()` akan dipanggil secara internal pada instance `FeederDikti` pemanggil fungsi ini sebelum melakukan request `action` yang dinginkan.** |
| `filter` | String |  Tidak   | `null`  | Filter yang digunakan dalam request. Menggunakan format seperti _where_ pada query SQL. Misalnya: `id_prodi = '123abcdef' and id_semester in ('20201', '20202')`. Akan mengambil semua data apabila variable ini tidak diterapkan.                                                                             |
| `limit`  |  Int   |  Tidak   | `null`  | Limit/batasan jumlah data yang diambil dalam request. Akan mengambil semua data apabila variable ini tidak diterapkan.                                                                                                                                                                                         |
| `offset` |  Int   |  Tidak   | `null`  | Offset data yang diambil dalam request. Akan mengambil data dari awal apabila variable ini tidak diterapkan.                                                                                                                                                                                                   |
| `order`  | String |  Tidak   | `null`  | Order/urutan data yang diambil dalam request. Menggunakan format seperti _order by_ pada query SQL. Misalnya: `id_semester ASC, id_prodi DESC`. Akan mengambil data tanpa diurutkan apabila variable ini tidak diterapkan.                                                                                     |

#### Contoh:

```js
feeder.get("Agama", {
  token: "123456abcdef",
  filter: "nama_agama like '%Islam%'",
  limit: 1,
  offset: 0,
  order: "nama_agama ASC",
});
```

> Daftar `action` yang didukung dapat dilihat di [method_dictionaries.txt](./src/method_dictionaries.txt). Secara umum, `action` adalah sama dengan nilai `act` pada body POST request endpoint Feeder Dikti yang berawalan "Get" dengan menghilangkan awalan tersebut. Contoh: "GetAgama" akan menjadi "Agama", "GetListMataKuliah" akan menjadi "ListMataKuliah", dst.

### Insert (`insert(action, record, options)`)

Fungsi ini digunakan untuk menginsert data `action` dengan `record` baru.

#### Parameter

- `action`: String action dari data yang ingin diinsert. Misalnya: "AktivitasMahasiswa", "RiwayatPendidikanMahasiswa", "PesertaKelasKuliah", dll.
- `record`: Object data yang ingin diinsert ke `action`. Variable dari object ini tergantung pada `action` yang diinginkan.
- `options`: Object pengaturan yang digunakan dalam menginsert data. Lebih lanjut dijelaskan di bawah ini.

#### Options

| Option  |  Type  | Required | Default | Keterangan                                                                                                                                                                                                                                                                                                     |
| ------- | :----: | :------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token` | String |  Tidak   | `null`  | Token yang digunakan untuk autentikasi dan otorisasi request. Dapat diperoleh dari fungsi `getToken()`. **Apabila variable ini tidak diterapkan, maka fungsi `getToken()` akan dipanggil secara internal pada instance `FeederDikti` pemanggil fungsi ini sebelum melakukan request `action` yang dinginkan.** |

#### Contoh:

```js
feeder.insert(
  "PesertaKelasKuliah",
  {
    id_kelas_kuliah: "123321abccba",
    id_registrasi_mahasiswa: "321123cbaabc",
  },
  { token: "123456abcdef" }
);
```

> Daftar `action` yang didukung dapat dilihat di [method_dictionaries.txt](./src/feeder-dikti/method_dictionaries.txt). Secara umum, `action` adalah sama dengan nilai `act` pada body POST request endpoint Feeder Dikti yang berawalan "Insert" dengan menghilangkan awalan tersebut. Contoh: "InsertAktivitasMahasiswa" akan menjadi "AktivitasMahasiswa", "InsertRiwayatPendidikanMahasiswa" akan menjadi "RiwayatPendidikanMahasiswa", dst.

### Update (`update(action, key, record, options)`)

Fungsi ini digunakan untuk mengupdate data `action` dengan id `key` dengan `record` baru.

#### Parameter

- `action`: String action dari data yang ingin diupdate. Misalnya: "AktivitasMahasiswa", "RiwayatPendidikanMahasiswa", dll.
- `key`: Object id dari data yang ingin diupdate pada `action`. Variable dari object ini tergantung pada `action` yang diinginkan.
- `record`: Object data yang ingin diinsert ke `action`. Variable dari object ini tergantung pada `action` yang diinginkan.
- `options`: Object pengaturan yang digunakan dalam negupdate data. Lebih lanjut dijelaskan di bawah ini.

#### Options

| Option  |  Type  | Required | Default | Keterangan                                                                                                                                                                                                                                                                                                     |
| ------- | :----: | :------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token` | String |  Tidak   | `null`  | Token yang digunakan untuk autentikasi dan otorisasi request. Dapat diperoleh dari fungsi `getToken()`. **Apabila variable ini tidak diterapkan, maka fungsi `getToken()` akan dipanggil secara internal pada instance `FeederDikti` pemanggil fungsi ini sebelum melakukan request `action` yang dinginkan.** |

#### Contoh:

```js
feeder.update(
  "RiwayatPendidikanMahasiswa",
  {
    id_registrasi_mahasiswa: "321123cbaabc",
  },
  {
    nim: "112000192",
  },
  { token: "123456abcdef" }
);
```

> Daftar `action` yang didukung dapat dilihat di [method_dictionaries.txt](./src/feeder-dikti/method_dictionaries.txt). Secara umum, `action` adalah sama dengan nilai `act` pada body POST request endpoint Feeder Dikti yang berawalan "Update" dengan menghilangkan awalan tersebut. Contoh: "UpdateAktivitasMahasiswa" akan menjadi "AktivitasMahasiswa", "UpdateRiwayatPendidikanMahasiswa" akan menjadi "RiwayatPendidikanMahasiswa", dst.

### Delete (`delete(action, key, options)`)

Fungsi ini digunakan untuk mendelete data `action` dengan id `key`.

#### Parameter

- `action`: String action dari data yang ingin didelete. Misalnya: "AktivitasMahasiswa", "RiwayatPendidikanMahasiswa", dll.
- `key`: Object id dari data yang ingin didelete pada `action`. Variable dari object ini tergantung pada `action` yang diinginkan.
- `options`: Object pengaturan yang digunakan dalam negupdate data. Lebih lanjut dijelaskan di bawah ini.

#### Options

| Option  |  Type  | Required | Default | Keterangan                                                                                                                                                                                                                                                                                                     |
| ------- | :----: | :------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token` | String |  Tidak   | `null`  | Token yang digunakan untuk autentikasi dan otorisasi request. Dapat diperoleh dari fungsi `getToken()`. **Apabila variable ini tidak diterapkan, maka fungsi `getToken()` akan dipanggil secara internal pada instance `FeederDikti` pemanggil fungsi ini sebelum melakukan request `action` yang dinginkan.** |

#### Contoh:

```js
feeder.delete(
  "AktivitasMahasiswa",
  {
    id_aktivitas: "0987zyxw",
    id_prodi: "7890wxyz",
    id_semester: "20201",
  },
  { token: "123456abcdef" }
);
```

> Daftar `action` yang didukung dapat dilihat di [method_dictionaries.txt](./src/feeder-dikti/method_dictionaries.txt). Secara umum, `action` adalah sama dengan nilai `act` pada body POST request endpoint Feeder Dikti yang berawalan "Delete" dengan menghilangkan awalan tersebut. Contoh: "DeleteAktivitasMahasiswa" akan menjadi "AktivitasMahasiswa", "DeleteRiwayatPendidikanMahasiswa" akan menjadi "RiwayatPendidikanMahasiswa", dst.

## Response

Seluruh request yang dipanggil dari instance API `FeederDikti` mereturn response dalam bentuk `Promise`. Untuk mengonsumsi response tersebut dapat dilakukan antara lain dengan salah satu cara berikut:

### Menggunakan `.then()` dan `.catch()`

`Promise` menyediakan callback `.then()` untuk mendapatkan response, serta `.catch()` apabila terdapat error pada fungsi yang dipanggil. Dengan callback ini, berikut adalah contoh penggunaannya pada API `FeederDikti` dengan menerapkan chaining:

```js
feeder
  .getToken()
  .then((token) => {
    // variable token siap dipakai
    console.log(token);

    // get "Agama" dengan mempassing variable token
    return feeder.get("Agama", { token: token, limit: 2, offset: 1 });
  })
  .then((agama) => {
    // variable agama siap dipakai
    console.log(agama);
  })
  .catch((err) => {
    // terjadi error
    console.error(err);
  });
```

### Menggunakan `async` dan `await`

Alternatif lainnya adalah dengan menggunakan fitur `async` dan `await`. Dengan fitur ini, berikut adalah contoh penggunaannya pada API `FeederDikti`:

```js
(async () => {
  try {
    const token = await feeder.getToken();

    // variable token siap dipakai
    console.log(token);

    // get "Agama" dengan mempassing variable token
    const agama = await feeder.get("Agama", {
      token: token,
      limit: 2,
      offset: 1,
    });

    // variable agama siap dipakai
    console.log(agama);
  } catch (err) {
    // terjadi error
    console.error(err);
  }
})();
```

## Troubleshooting

### Bagaimana cara menggunakan API pada endpoint HTTPS dengan self-signed certificate?

Untuk menggunakan API pada environment ini, dapat dilakukan dengan menggunakan `Agent` dari package `https` pada saat inisiasi. Selanjutnya, untuk menonaktifkan pengecekan sertifikat (harus dilakukan apabila menggunakan self-signed certificate), tambahkan `rejectUnauthorized: false` pada `Agent` tersebut.

Contoh:

```js
const { FeederDikti } = require("@rahadi23/feeder-dikti");
// Agent dari package https
const { Agent } = require("https");

const feeder = new FeederDikti({
  // Host HTTPS dengan self-signed certificate
  host: "https://10.0.12.120:8000",
  username: "admin",
  password: "passwordKuatAdmin123#",
  // Tambahkan line berikut:
  agent: new Agent({ rejectUnauthorized: false }),
});
```
