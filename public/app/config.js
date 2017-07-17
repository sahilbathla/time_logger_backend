/*Require JS Config*/
require.config({
	paths: {
		'angular': '../bower_components/angular/angular',
		'angular-route': '../bower_components/angular-route/angular-route',
		'text': '../bower_components/requirejs-text/text',
		'geolocation': '../bower_components/ngGeolocation/ngGeolocation.min'
	},
	shim: {
		'angular' : { exports : 'angular' },
		'angular-route' : { deps : ['angular'] },
		'geolocation' : { deps : ['angular'] }
	}
});

requirejs(['app', 'angular', 'controllers/HomeController'], function (app, angular, HomeController) {
	'use strict';

	/* Handle Routes */
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/app/views/home.html',
			controller: 'HomeController'
		}).otherwise({redirectTo : '/'});
	}]);

	angular.bootstrap(document, ['openWeatherApp']);
});