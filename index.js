import 'dotenv/config';
import app from './app.js';
import db from './src/models/index.js';

const { sequelize } = db;

const PORT = process.env.PORT;


const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi database Mysql berhasil");

    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  } catch (error) {
    console.error('x Gagal menjalankan server', error)
    process.exit
  }
};

start();
