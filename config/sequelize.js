var config = require ('./config.json');
var auth = config[config.environment];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(auth.database, auth.username, auth.password, {
  host: auth.host,
  port: auth.port,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = sequelize;