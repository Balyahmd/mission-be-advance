'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(`
      SELECT id, email
      FROM Users
      WHERE email IN ('tutor@videobelajar.com')
    `);

    const userMap = {};

    users.forEach((user) => {
      userMap[user.email] = user.id;
    });

     await queryInterface.bulkInsert('Tutors', [
      {
        user_id: userMap['tutor@videobelajar.com'],
        expertise: 'Senior tutor Vidio belajar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tutors', null, {});
  }
};
