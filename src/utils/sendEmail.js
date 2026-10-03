import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendmail = async (toEmail, token) => {
  const mailOptions = {
    from: `"Video Belajar" <${process.env.MAIL_FROM}>`,
    to: toEmail,
    subject: "Verifikasi Email Akun Video Belajar",
    html: `
      <h3>Selamat Datang di Video Belajar!</h3>
      <p>Gunakan token berikut untuk memverifikasi akun Anda:</p>
      <p style="font-size:18px;font-weight:bold;letter-spacing:1px;">${token}</p>
      <p>Kirim token ini ke endpoint <b>verifikasi-email</b> untuk mengaktifkan akun.</p>
    `,
    text: `Token verifikasi akun Anda: ${token}`,
  };

  await transporter.sendMail(mailOptions);
};
