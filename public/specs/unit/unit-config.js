require.config({
	paths: {
		'angular': '../../bower_components/angular/angular',
		'geolocation': '../../bower_components/ngGeolocation/ngGeolocation.min',
		'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
		'angular-route': '../../bower_components/angular-route/angular-route',
		'text': '../../bower_components/requirejs-text/text',
		'app': '../../app/app'
	},
	shim: {
		'angular' : { exports: 'angular' },
		'geolocation' : { deps: ['angular'] },
		'angular-mocks': { deps: ['angular'] },
		'angular-route' : { deps : ['angular'] }
	}
});