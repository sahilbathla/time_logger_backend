// load up the user model
var Log  = require('../models/logs');
var User  = require('../models/user');

function getDayTimeStamp(date) {
	if (date) {
		return parseInt(new Date(date).getTime()/1000, 10) - parseInt(new Date(date).getTime()/1000, 10)%86400;
	} else {
		return parseInt(new Date().getTime()/1000, 10) - parseInt(new Date().getTime()/1000, 10)%86400;
	}
}

module.exports.create = function createLog (req, res) {
	var description = req.body.logDescription;

	var newLog = new Log();
	newLog.description = description;
	newLog.fk_user = req.xyz.user.id;

	newLog.save().then(function() {
		res.send(200, newLog);
	});
};


module.exports.all = function createLog (req, res) {
	var todaysDate = getDayTimeStamp();
	User.findOne({id: req.xyz.user.id}).then(function (user) {
		user.getLogs().then(function (logs) {
			for (var i = 0; i < logs.length; i++) {
				var createdAtDate = getDayTimeStamp(logs[i].createdAt);
				logs[i].dataValues.updateAllowed = createdAtDate == todaysDate;
			}
			res.send(200, logs);
		});
	});
};


module.exports.edit = function createLog (req, res) {
	var logId = req.params.logId;
	var description = req.body.logDescription;

	Log.findOne({ where: { 'id' : logId } }).then(function (log) {
		var createdAtDate = getDayTimeStamp(log.createdAt);
		var todaysDate = getDayTimeStamp();
		if (createdAtDate == todaysDate) {
			log.description = description;
			log.save().then(function (log) {
				res.send(200, log);
			});
		} else {
			res.send(400, { err: 'Invalid Date' });
		}
	});
};