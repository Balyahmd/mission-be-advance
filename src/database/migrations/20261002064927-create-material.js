"use strict";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Materials", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      modul_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "ModulKelas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type_material: {
        type: Sequelize.ENUM("video", "document", "quiz"),

        defaultValue: "video",
      },
      title_material: {
        type: Sequelize.STRING,
      },
      material_url: {
        type: Sequelize.STRING,
      },
      duration_minute: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Materials");
  },
};
