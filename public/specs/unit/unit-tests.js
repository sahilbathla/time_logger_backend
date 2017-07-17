require(['test-runner', 'angular', 'angular-mocks', '../../app/services/LocationService'], function (testRunner, angular) {

	describe('openWeatherApp', function () {

		beforeEach(function() {
			module('openWeatherApp');
		});

		describe('locationService', function () {

			var locationService, $httpBackend;

			beforeEach(function() {
				inject(function (_locationService_, _$httpBackend_) {
					locationService = _locationService_;
					$httpBackend = _$httpBackend_;
					$httpBackend.whenGET(/.*api\.openweathermap\.org.*?zip=110018.*/).respond(
						{
							main: {
								temp: 318.5
							},
							name: 'Nangloi Jat'
						}
					);
					$httpBackend.whenGET(/.*api\.openweathermap\.org.*?q=undefined.*/).respond(
						{ cod: '404' }
					);
				});
			});

			it('gets the correct weather data based on zip', function () {
				var weatherData;
				locationService.getLocation({zip: '110018'}).then(function(response) {
					expect(response.data.main.temp).toBe(318.5);
					expect(response.data.name).toBe('Nangloi Jat');
				}, function (error) {
					expect("received error: " + error).toFail();
				});
    			$httpBackend.flush();
			});

			it('gives error if zip is undefined', function () {
				var weatherData;
				locationService.getLocation({zip: undefined}).then(function(response) {
					expect(response.data.cod).toBe('404');
				}, function (error) {
					expect("received error: " + error).toFail();
				});
    			$httpBackend.flush();
			});
		});
	});

	testRunner.execJasmine();
});