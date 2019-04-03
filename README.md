# MozSpace Event Management
Manajemen acara dan peserta acara yang lebih baik

## Panduan Pemasangan
1. Unduh repositori ini
2. ```$ cd mozspacejkt-backend```
3. ```$ cp .env.example .env```
4. Isi kredensial pada berkas .env
5. Untuk menginisialisasi (seed) pengguna buat bekas baru dengan menyalin kode dari `intialUsers.js.example` pada folder /server/boot/seeds dengan nama  `intialUser.js` saja
5. Jalakan perintah berikut untuk menjalakan proyek : ```$ node .```, atau gunakan [nodemon](https://nodemon.io/) agar _auto-refresh_ ketika ada perubahan file.

## Panduan Deployment

Pertama yang perlu di perhatikan adalah _environment variable_ pada loopback, bisa di lihat selengkapnya di https://loopback.io/doc/en/lb3/Environment-specific-configuration.html 


### Catatan
- Environtment Variable menggunakan [dotenv](https://github.com/motdotla/dotenv)
