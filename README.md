# MozSpace Event Management
Manajemen acara dan peserta acara yang lebih baik

## Panduan Pemasangan
1. Unduh repositori ini
2. ```$ cd mozspace-backedn```
3. ```$ cp .env.example .env```
4. Isi kredensial pada berkas .env
5. Untuk menginisialisasi (seed) pengguna buat bekas baru dengan menyalin kode dari `intialUsers.js.example` pada folder /server/boot/seeds dengan nama  `intialUser.js` saja
5. Jalakan perintah berikut untuk menjalakan proyek : ```$ node .```


### Catatan
- Environtment Variable menggunakan [dotenv](https://github.com/motdotla/dotenv)
