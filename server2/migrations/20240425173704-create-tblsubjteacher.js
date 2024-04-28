'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tblsubjteachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tokens: {
        type: Sequelize.STRING
      },
      classId: {
        type: Sequelize.STRING
      },
      classArmId: {
        type: Sequelize.STRING
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      subjId: {
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
    await queryInterface.dropTable('tblsubjteachers');
  }
};