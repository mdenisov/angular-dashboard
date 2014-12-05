angular.module("ui.bankiru", [])

	.directive( 'popoverHtmlPopup', [ function() {
		return {
			restrict: 'EA',
			replace: true,
			scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
			templateUrl: 'views/directives/popover/popover-html.tpl.html'
		};
	}])

	.directive( 'popoverHtml', [ '$compile', '$timeout', '$parse', '$window', '$tooltip', function ( $compile, $timeout, $parse, $window, $tooltip ) {
		return $tooltip( 'popoverHtml', 'popover', 'click' );
	}]);