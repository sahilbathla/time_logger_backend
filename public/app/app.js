define('app', ['angular', 'angular-route', 'geolocation'], function (angular, ngRoute, ngGeolocation) {
	'use strict';
	var app = angular.module('openWeatherApp', ['ngRoute', 'ngGeolocation']);
	app.constant('OPEN_WEATHER_APP_ID', '44db6a862fba0b067b1930da0d769e98');
	return app;
});