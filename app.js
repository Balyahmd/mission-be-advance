import 'dotenv/config';
import express from 'express'
import authRoutes from "./src/routes/authRoute.js";
import courseRoute from "./src/routes/courseRoute.js"
import uploadRoute from "./src/routes/uploadRoute.js"

const app = express();                               
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));   

app.get('/', (req, res) => res.json({ success: true, message: 'VideoBelajar API berjalan' }));

app.use("/api/auth", authRoutes);
app.use("/api", courseRoute)
app.use("/api", uploadRoute);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Format JSON tidak valid' });
  }
  console.error('[app] Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
});

export default app;





