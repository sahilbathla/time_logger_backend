/**
 * WeatherDirective - Displays weather based on current location or location provided in input
 *
 * @restrict Element
 * @example:
 * <weather></weather>
 *
 * modal-controller is optional
 */
define(['angular', 'app', 'text!views/shared/directives/weather.html', 'services/LocationService', 'services/WeatherService'], function (ng, app, template) {
	'use strict';

	function WeatherDirective (locationService, weatherService) {
		return {
			restrict: 'E',
			template: template,
			compile: function () {
				return function link(scope, element, attrs) {

					function setWeatherData(weatherData) {
						scope.fetchedLocationWeather = {
							forecast: weatherData.data.weather[0].main + '(' + weatherData.data.weather[0].description + ')',
							temp: (weatherData.data.main.temp - 273).toFixed(1),
							humidity: weatherData.data.main.humidity,
							city: weatherData.data.name
						}
					}

					function showErrorAndRetry() {
						scope.isFetchingWeatherData = false;
						scope.hasNoWeatherData = true;
						scope.isManualLocationRequired = true;
					}

					scope.isFetchingWeatherData = true;

					scope.fetchLocation = function (locationData) {
						scope.isManualLocationRequired = false;
						scope.hasNoWeatherData = false;
						weatherService.getWeatherData(locationData).then(function (weatherData) {
							scope.isFetchingWeatherData = false;
							if (weatherData.data.cod === '404') {
								showErrorAndRetry();
							} else {
								setWeatherData(weatherData);
							}
						}, function () {
							showErrorAndRetry();
						});
					};

					scope.getManualLocation = function () {
						scope.isFetchingWeatherData = false;
						scope.isManualLocationRequired = true;
					}

					scope.resetLocation = function () {
						scope.isManualLocationRequired = true;
						delete scope.fetchedLocationWeather
					}

					locationService.getGeoLocation().then(scope.fetchLocation, scope.getManualLocation);
				};
			}
		};
	}

	WeatherDirective.$inject = ['locationService', 'weatherService'];

	app.directive('weather', WeatherDirective);
});
