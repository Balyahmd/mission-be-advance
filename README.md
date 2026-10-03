Video Belajar App - Backend RESTful API

Sistem backend RESTful API untuk Video Belajar App yang dibangun menggunakan Node.js dan Express.js. Proyek ini mencakup manajemen entitas pengguna, autentikasi berbasis JWT, middleware proteksi endpoint, pencarian & penyaringan data (Query Params), verifikasi email melalui Nodemailer dengan layanan Mailtrap, serta fitur unggah berkas menggunakan Multer.

🛠️ Teknologi yang Digunakan

Runtime & Framework: Node.js, Express.js

Database: MySQL 

Security & Auth: bcrypt (Hashing Password), jsonwebtoken (JWT)

Email Service: nodemailer, uuid, Mailtrap

File Processing: multer

🚀 Fitur Utama & Alur Implementasi

1. Perancangan Entitas User & ERD

Menyimpan data pengguna yang mengakses aplikasi dengan atribut wajib:

Fullname

Username

Password (Disimpan dalam bentuk hash)

Email

2. Implementasi Registrasi (/register)

Mengenkripsi password menggunakan library bcrypt sebelum disimpan ke database (INSERT).

Endpoint registrasi menerima payload fullname, username, password, dan email.

3. Implementasi Login (/login)

Memeriksa keberadaan user berdasarkan email.

Verifikasi password menggunakan bcrypt.compare.

Menghasilkan token autentikasi menggunakan jsonwebtoken (JWT) saat login berhasil.

4. Middleware Autentikasi (authMiddleware)

Memeriksa keberadaan token pada header req.headers.authorization.

Memverifikasi validitas token menggunakan jwt.verify dan secretKey.

Memproteksi endpoint (contoh: GET /movies atau GET /courses).

5. Query Params (Filter, Sort, & Search)

Modifikasi service GET all DATA untuk Video Belajar App agar menangani:

Filter: Penyaringan berdasarkan kategori video (WHERE).

Sort: Pengurutan data berdasarkan kolom tertentu (ORDER BY).

Search: Pencarian judul/deskripsi video (WHERE & LIKE).

6. Verifikasi Email via Mailtrap

Menggunakan uuid untuk membuat token verifikasi unik saat registrasi.

Mengirimkan link/token verifikasi ke email pengguna menggunakan nodemailer dengan SMTP server Mailtrap.

Endpoint GET /verifikasi-email untuk memvalidasi token di database.

7. Upload Gambar / Thumbnail (/upload)

Menggunakan middleware multer untuk menangani berkas media (seperti foto profil atau thumbnail video).

Menyimpan file terunggah ke direktori /upload di akar proyek secara aman.

📁 Struktur Direktori Proyek

videobelajar-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── videoController.js
│   └── uploadController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── videoRoutes.js
│   └── uploadRoutes.js
├── services/
│   └── emailService.js
├── uploads/
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md


⚙️ Panduan Instalasi & Jalankan Proyek

1. Clone Repository & Install Dependensi

git clone 
cd mission-be-advance
npm install


2. Pengaturan Environment Variables (Mailtrap SMTP)

Buat file .env di direktori utama dan sesuaikan konfigurasinya dengan kredensial Mailtrap milik Anda:

PORT=5000
DB_HOST=localhost
DB_USER=your_userDb
DB_PASSWORD=yourpassword
DB_NAME=videobelajar_db

JWT_SECRET=your_jwt_secret_key

# Mailtrap SMTP Configuration
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user_id
MAIL_PASS=your_mailtrap_password


3. Jalankan Aplikasi

# Mode Development
npm run dev

# Mode Production
npm start


📌 Endpoint API Utama

Method

Endpoint

Fungsi

Proteksi Token

POST

/api/auth/register

Mendaftar akun baru

❌

POST

/api/auth/login

Login & mendapatkan JWT token

❌

GET

/api/auth/verifikasi-email

Verifikasi token email via Mailtrap

❌

GET

/api/videos

Mengambil data video (Support Filter, Sort, Search)

✅

POST

/api/upload

Mengunggah gambar/thumbnail ke server

✅

🧪 Pengujian API

Pengujian endpoint dapat dilakukan menggunakan aplikasi API Client seperti Postman atau Thunder Client. Untuk fitur verifikasi email, Anda dapat melihat inbox simulasi pada dashboard Mailtrap.

Pastikan untuk menyertakan token pada Header request untuk endpoint yang terproteksi:

Authorization: Bearer <TOKEN_JWT_ANDA>
