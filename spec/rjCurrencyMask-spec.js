describe("rjCurrencyMask Module", function() {
	var scope, element, compile, filter;

	beforeEach(angular.mock.module('rjCurrencyMask'));
	beforeEach(angular.mock.inject(function($rootScope, $compile, $filter) {
			scope = $rootScope;
			compile = $compile;
			filter = $filter;
			element = compile('<input type="text" ng-model="currencyNumber" rj-currency-mask>')(scope);

			scope.$digest();
	}));

	describe('EN-US', function(){

		describe("directive", function() {
			it("should format numbers to currency strings", function() {
				element.val(12345).blur();
				expect(element.val()).toBe('$12,345.00');
			});
		});

		describe("cleanCurrencyString $filter", function() {

			it("should remove the currency", function() {
				var result = filter('cleanCurrencyString')('$123');
				expect(result).toBe(123);
			});

			it("should remove seperaters", function() {
				var result = filter('cleanCurrencyString')('$12,398.98');
				expect(result).toBe(12398.98);
			});

			it("should retain decimals", function() {
				var result = filter('cleanCurrencyString')('$123.98');
				expect(result).toBe(123.98);
			});


			//negatives
			//in uk, us etc. negative values in currency are written (£123.00)
			//to change the formatting for this you must change the $locale file PATTERN[1] (which is the currency formatting)

			it("should retain negative values", function() {
				var result = filter('cleanCurrencyString')('($123.00)');
				expect(result).toBe(-123);
			});

		});
	})

	describe('ES-ES', function(){
		it("should load spanish", function(done) {
			var se = document.createElement('script');
			se.type = "text/javascript";
			se.src = 'src/angular-locale_es-es.js';
			document.getElementsByTagName('head')[0].appendChild(se);
			se.onload = function() {
				done();
			}
		});

		describe("directive", function() {
			it("should format numbers to currency strings", function() {
				element.val(12345).blur();
				expect(element.val()).toBe('12.345,00 €');
			});
		})

		describe("cleanCurrencyString $filter", function() {

			it("should remove the currency", function() {
				var result = filter('cleanCurrencyString')('123 €');
				expect(result).toBe(123);
			});

			it("should remove seperaters", function() {
				var result = filter('cleanCurrencyString')('12.398,98 €');
				expect(result).toBe(12398.98);
			});

			it("should retain decimals", function() {
				var result = filter('cleanCurrencyString')('123,98€');
				expect(result).toBe(123.98);
			});

			//negatives
			//in uk, us etc. negative values in currency are written (£123.00)
			//to change the formatting for this you must change the $locale file PATTERN[1] (which is the currency formatting)

			it("should retain negative values", function() {
				var result = filter('cleanCurrencyString')('-123,00 €');
				expect(result).toBe(-123);
			});

		});
	})
	describe('En-GB', function(){

		it("should load English", function(done) {
			var se = document.createElement('script');
			se.type = "text/javascript";
			se.src = 'src/angular-locale_en-gb.js';
			document.getElementsByTagName('head')[0].appendChild(se);
			se.onload = function() {
				done();
			}
		});

		describe("directive", function() {
			it("should format numbers to currency strings", function() {
				element.val(12345).blur();
				expect(element.val()).toBe('£12,345.00');
			});
		});

		describe("cleanCurrencyString $filter", function() {

			it("should remove the currency", function() {
				var result = filter('cleanCurrencyString')('£123');
				expect(result).toBe(123);
			});

			it("should remove seperaters", function() {
				var result = filter('cleanCurrencyString')('£12,398.98');
				expect(result).toBe(12398.98);
			});

			it("should retain decimals", function() {
				var result = filter('cleanCurrencyString')('£123.98');
				expect(result).toBe(123.98);
			});


			//negatives
			//in uk, us etc. negative values in currency are written (£123.00)
			//to change the formatting for this you must change the $locale file PATTERN[1] (which is the currency formatting)

			it("should retain negative values", function() {
				var result = filter('cleanCurrencyString')('-£123.00');
				expect(result).toBe(-123);
			});

		});
	})

});

