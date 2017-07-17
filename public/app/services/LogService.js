/*
	Log Service can be used to fetch/create/edit logs
*/
define(['angular', 'app'], function (angular, app) {
	'use strict';

	function LogService ($http) {
		this.createLog = function (params) {
			return $http.post('/logs', params);
		};

		this.getAllLogs = function () {
			return $http.get('/logs');
		};

		this.editLog = function (id, params) {
			return $http.patch('/logs/' + id, params);
		}
	}

	LogService.$inject = ['$http'];

	app.service('logService', LogService);
});