'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblattendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admissionNumber: {
        type: Sequelize.STRING
      },
      classId: {
        type: Sequelize.STRING
      },
      classArmId: {
        type: Sequelize.STRING
      },
      sessionTermId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      dateTimeTaken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tblattendances');
  }
};