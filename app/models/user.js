const Sequelize = require('sequelize');
var dbConnection = require('../../config/sequelize.js')

const User = dbConnection.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  email: Sequelize.STRING,
  token: Sequelize.STRING,
  name: Sequelize.STRING
});

module.exports = User;

var Logs = require('./logs.js');

User.hasMany(Logs, {foreignKey: 'fk_user'});