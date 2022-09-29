'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down (queryInterface) {
    await queryInterface.dropTable('teams');
  },
};
