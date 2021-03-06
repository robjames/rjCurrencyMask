rjCurrencyMask
==========

An AngularJs module to mask input fields to currency formatting.

You should be able to type in the input and it will always format the string to a currency format.

This module uses the AngularJs $locale service to ensure this works across all currencies.

##Demo

[http://htmlpreview.github.io/?https://raw.github.com/robjames/rjCurrencyMask/master/src/index.html](http://htmlpreview.github.io/?https://raw.github.com/robjames/rjCurrencyMask/master/src/index.html)

Initial value set to a negative and in Spanish formatting.

##Usage
Inject the module in your app

`angular.module('MyApp', ['rjCurrencyMask'])`

and then ensure you add the directive to an input field you want the mask applied to 

`<input type="text" ng-model="yourModelValue" rj-currency-mask>`

**Note:** The imput must be of type text (becuase you can't put a currency symbol in a number field)

And the input must have `ng-model`

###i18n and l10n

If you want to use formatting other than the default en-US you need to include the correct *$locale* file, as per : [https://docs.angularjs.org/guide/i18n](https://docs.angularjs.org/guide/i18n)

##Tests

Open the SpecRunner.html in a browser.