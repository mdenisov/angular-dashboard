'use strict';

angular.module('ngSwitcher', [])

	.directive('uiSwitch', [function() {

		return {
			require: "ngModel",
			restrict: "AE",
			scope: {},
			template: '<div class="switch" ng-class="{\'switch-left\': !model, \'switch-right\': model}" ng-click="toggle()">\n  <div class="switch-button">&nbsp;</div>\n</div>',
			link: function(t, e, n, i) {
				var r;
				return r = function() {
					return t.model = i.$viewValue
				}, t.toggle = function() {
					return i.$setViewValue(!i.$viewValue), r()
				}, i.$render = function() {
					return r()
				}
			}
		}

	}]);