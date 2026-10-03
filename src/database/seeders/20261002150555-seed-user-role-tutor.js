"use strict";

export default {
  async up(queryInterface) {
    const { default: bcrypt } = await import("bcryptjs");
    const password = await bcrypt.hash("Password123", 10);
    const now = new Date();

    await queryInterface.bulkInsert("Users", [
      {
        full_name: "Sari Tutor",
        username: "sari_tutor",
        number_phone: "081234567892",
        email: "tutor@videobelajar.com",
        password,
        foto_profile: null,
        gender: "female",
        role: "tutor",
        verification_token: null,
        is_verified: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      email: "tutor@videobelajar.com",
    });
  },
};