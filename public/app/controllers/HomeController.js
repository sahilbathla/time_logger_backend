define('controllers/HomeController', ['app', 'services/LoginService', 'services/LogService'], function (app) {
	'use strict';

	function HomeController($scope, $timeout, loginService, logService) {
		$scope.logFormVisible = false;
		$scope.logs = [];
		$scope.currentLog = {
			'description': '',
			'id': null
		}

		loginService.isLoggedIn().then(function (value) {
			$scope.isLoggedIn = value.data.loggedIn;
			$scope.loginFetched = true;
		}).catch(function (err) {
			$scope.isLoggedIn = false;
		});

		logService.getAllLogs().then(function (value) {
			for (var i = 0; i < value.data.length; i++) {
				value.data[i].createdAt = value.data[i].createdAt.substr(0, value.data[i].createdAt.length-5)
			}
			$scope.logs = value.data;
		});

		$scope.createNewLog = function () {
			logService.createLog({ logDescription: $scope.currentLog.description }).then(function (value) {
				var log = value.data;
				log.createdAt = log.createdAt.substr(0, log.createdAt.length - 5);
				$scope.logs.push(log);
				$scope.logFormVisible = false;
			}).catch(function (err) {
				alert("Could not create log");
			});
		};

		$scope.editLog = function () {
			logService.editLog($scope.currentLog.id, { logDescription: $scope.currentLog.description }).then(function (value) {
				var log = value.data;
				for (var i = 0; i < $scope.logs.length; i++) {
					if ($scope.logs[i].id == log.id) {
						$scope.logs[i].description = log.description;
					}
				}
				$scope.logFormVisible = false;
			}).catch(function (err) {
				alert("Could not create log");
			});
		};

		$scope.enterLog = function () {
			if ($scope.currentLog.id) {
				$scope.editLog();
			} else {
				$scope.createNewLog();
			}
			$scope.currentLog.id = null;
			$scope.currentLog.description = '';
		};


		$scope.openLogForm = function (log) {
			if (log) {
				$scope.currentLog.id = log.id;
				$scope.currentLog.description = log.description;
			}
			$scope.logFormVisible = true;
		};
	}

	HomeController.$inject = ['$scope', '$timeout', 'loginService', 'logService'];

	app.controller('HomeController', HomeController);
});