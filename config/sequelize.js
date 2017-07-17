var config = require ('./config.json');
var auth = config[config.environment];

const Sequelize = require('sequelize');
var sequelize;

if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
	sequelize = new Sequelize(auth.database, auth.username, auth.password, {
	  host: auth.host,
	  port: auth.port,
	  dialect: 'postgres',

	  pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  },
	});
}


module.exports = sequelize;