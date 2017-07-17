'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable (
      'logs',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fk_user: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        endedAt: {
          type: Sequelize.DATE
        },
        description: Sequelize.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('logs')
  }
};
