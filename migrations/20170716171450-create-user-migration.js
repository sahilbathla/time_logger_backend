'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable (
      'users',
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        token: Sequelize.TEXT
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
};
