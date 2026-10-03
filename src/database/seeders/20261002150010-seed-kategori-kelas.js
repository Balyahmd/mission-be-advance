"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("KategoriKelas", [
      {
        name_kategori: "pengembangan diri",
        createdAt: now,
        updatedAt: now,
      },
      {
        name_kategori: "desain",
        createdAt: now,
        updatedAt: now,
      },
      {
        name_kategori: "pemasaran",
        createdAt: now,
        updatedAt: now,
      },
      {
        name_kategori: "bisnis",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("KategoriKelas", {
      name_kategori: ["pengembangan diri", "desain", "pemasaran", "bisnis"],
    });
  },
};
