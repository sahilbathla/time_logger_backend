define([], function () {
	'use strict';

	function TestRunner() {
		this.jasmineEnv = jasmine.getEnv();
		this.jasmineEnv.updateInterval = 1000;

		var htmlReporter = new jasmine.HtmlReporter();
		this.jasmineEnv.addReporter(htmlReporter);

		this.jasmineEnv.specFilter = function (spec) {
			return htmlReporter.specFilter(spec);
		};
	}

	TestRunner.prototype.execJasmine = function () {
		this.jasmineEnv.execute();
	}

	return new TestRunner();
});