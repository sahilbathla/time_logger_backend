const Sequelize = require('sequelize');
var dbConnection = require('../../config/sequelize.js')

const Log = dbConnection.define('log', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  description: Sequelize.STRING,
  fk_user: Sequelize.STRING
});

module.exports = Log;

var User = require('./user.js');

Log.belongsTo(User, {foreignKey: 'fk_user'});