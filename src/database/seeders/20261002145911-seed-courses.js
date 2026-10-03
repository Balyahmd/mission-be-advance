const courseByKategori = {
  "pengembangan diri": {
    title: "Public Speaking dan Percaya Diri",
    description:
      "Latihan berbicara di depan umum, mengelola grogi, dan membangun kebiasaan produktif.",
    normal_price: 400000,
    discount_price: 300000,
  },
  desain: {
    title: "Dasar UI/UX Design dengan Figma",
    description:
      "Pengenalan prinsip desain, wireframe, dan prototyping untuk membuat tampilan aplikasi yang rapi.",
    normal_price: 500000,
    discount_price: 350000,
  },
  pemasaran: {
    title: "Digital Marketing untuk Pemula",
    description:
      "Strategi media sosial, iklan berbayar, dan dasar analitik untuk mengembangkan produk.",
    normal_price: 450000,
    discount_price: 320000,
  },
  bisnis: {
    title: "Memulai Bisnis dari Nol",
    description:
      "Validasi ide, perencanaan keuangan sederhana, dan strategi penjualan untuk bisnis baru.",
    normal_price: 600000,
    discount_price: 420000,
  },
};

export default {
  async up(queryInterface) {
    const [tutors] = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE role = 'tutor' ORDER BY id ASC LIMIT 1"
    );
    const [kategori] = await queryInterface.sequelize.query(
      "SELECT id, name_kategori FROM KategoriKelas ORDER BY id ASC"
    );

    if (!tutors.length) {
      throw new Error("Belum ada user dengan role 'tutor'. Seed tutor dulu.");
    }
    if (!kategori.length) {
      throw new Error("Belum ada data kategori kelas. Seed kategori dulu.");
    }

    const tutorId = tutors[0].id;
    const now = new Date();

    const courses = kategori.map((k) => {
      const data = courseByKategori[k.name_kategori] || {
        title: `Kelas Dasar ${k.name_kategori}`,
        description: `Kursus pengantar ${k.name_kategori} untuk pemula.`,
        normal_price: 500000,
        discount_price: 350000,
      };

      const randomImage = Math.floor(Math.random() * 9) + 1;

      return {
        kategori_id: k.id,
        tutor_id: tutorId,
        title: data.title,
        thumbnail: `https://ik.imagekit.io/rl8cjaky2/images/image-card${randomImage}.jpg`,
        description: data.description,
        normal_price: data.normal_price,
        discount_price: data.discount_price,
        createdAt: now,
        updatedAt: now,
      };
    });

    await queryInterface.bulkInsert("Kelas", courses);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Kelas", null, {});
  },
};