"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "password", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "status", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "password");
    await queryInterface.removeColumn("users", "status");
  },
};
