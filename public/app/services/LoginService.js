/*
	Login Service can be used to fetch login status or to login from browser
*/
define(['angular', 'app'], function (angular, app) {
	'use strict';

	function LoginService ($http) {
		this.isLoggedIn = function () {
			return $http.get('/loggedIn');
		};
	}

	LoginService.$inject = ['$http'];

	app.service('loginService', LoginService);
});