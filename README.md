# MozSpace Event Management
Manajemen acara dan peserta acara yang lebih baik

## Panduan Pemasangan
1. Unduh repositori ini
2. ```$ cd mozspacejkt-backend```
3. ```$ cp .env.example .env```
4. Isi kredensial pada berkas .env
5. Untuk menginisialisasi (seed) pengguna buat bekas baru dengan menyalin kode dari `intialUsers.js.example` pada folder /server/boot/seeds dengan nama  `intialUser.js` saja
5. Jalakan perintah berikut untuk menjalakan proyek : ```$ node .```, atau gunakan [nodemon](https://nodemon.io/) agar _auto-refresh_ ketika ada perubahan file.

## Menjalankan Aplikasi Dengan Docker

Dari folder aplikasi Anda, Jalankan langkah-langkah berikut, ganti `<username>` dengan nama Anda misal `<jokosu10>`:

Untuk membuild docker images:

- `$ docker build -t <username>/mozspace-jkt-backend .`

Pastikan tidak ada erorr saat build images, setelah itu jalankan perintah dibawah ini untuk menjalankan aplikasi anda.

- `$ docker run -p 3000:4000 -d <username>/mozspace-jkt-backend`

Server API Anda akan berjalan pada alamat berikut `http://localhost:3000`, silahkan menuju alamat `http://localhost:3000/explorer/` untuk membaca dokumentasi API.

Untuk menghentikan container aplikasi Anda, silahkan ketik perintah berikut :

- `docker stop $(docker ps -a -q)`

## Panduan Deployment

Pertama yang perlu di perhatikan adalah _environment variable_ pada loopback, bisa di lihat selengkapnya di https://loopback.io/doc/en/lb3/Environment-specific-configuration.html


### Catatan
- Environtment Variable menggunakan [dotenv](https://github.com/motdotla/dotenv)
