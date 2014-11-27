/*global angular */
(function(){
'use strict';
angular.module('rjCurrencyMask', [])
.filter('cleanCurrencyString', ['$locale', function($locale){
	var l = $locale;
	var DECIMAL = l.NUMBER_FORMATS.DECIMAL_SEP;
	var NEG = [l.NUMBER_FORMATS.PATTERNS[1].negPre.trim(), l.NUMBER_FORMATS.PATTERNS[1].negSuf.trim()];
	var removeFormattingRegex = new RegExp('[\\d\\'+DECIMAL+']+', 'g');
	var negativeRegex = new RegExp('['+NEG[0]+''+NEG[1]+']+', 'g');
	var replaceDecimalRegex = new RegExp('[\\'+DECIMAL+']+', 'g');

	return function(viewValue){
		negativeRegex.lastIndex = 0;
		var isNegative = negativeRegex.test(viewValue);
		var arr = viewValue.match(removeFormattingRegex);
		if (angular.isArray(arr)){
			arr = arr.join('');
			var num = parseFloat(arr.replace(replaceDecimalRegex,'.'));
			return (isNegative) ? num*-1 : num;
		}
		return viewValue;
	}
}])
.directive('rjCurrencyMask', ['$filter', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel){

			var clean = $filter('cleanCurrencyString');
			var format = function(modelValue) {
				return $filter('currency')((modelValue || 0 ));
			}

			ngModel.$parsers.push(clean);
			ngModel.$formatters.push(format);

			element.on('blur', function(){
				this.value = format(clean(this.value));
			});
		}
	};
}])


})();