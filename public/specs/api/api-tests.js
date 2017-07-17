require(['test-runner'], function (testRunner) {

	describe('openWeatherApp', function () {

		describe('Current Weather Api', function () {
			var zipRequest, delay = 500;

			beforeEach(function () {
				var BASE_URL = 'http://api.openweathermap.org/data/2.5/weather',
					APP_ID = '44db6a862fba0b067b1930da0d769e98';

				zipRequest = function (zip) {
					var responseDataPromise = $.Deferred();
					setTimeout(function () {
						$.ajax({
							url: BASE_URL + '?zip=' + zip + '&appid=' + APP_ID,
							dataType: 'json',
							success: function(data) {
								responseDataPromise.resolve(data);
							}
						});
					}, delay);
					return responseDataPromise;
				}
			});

			it ('should fetch correct data for a valid zip', function () {
				zipRequest('110018').then(function (data) {
					expect(data.name).toBe('Nangloi Jat');
				});
			});

			it ('should give error code for incorrect zip', function () {
				zipRequest('Nan').then(function (data) {
					expect(data.cod).toBe('404');
				});
			});

		});
	});

	testRunner.execJasmine();
});