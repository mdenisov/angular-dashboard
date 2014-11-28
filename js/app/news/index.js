
angular.module('news', [
		'services.crud',
        'dataResource',

        'services.i18nNotifications',
        'show-errors'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', '', '', ['Новости', 'Новости'])
			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
	}])

//    .config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.when('/news', {
//            templateUrl:'news/list.tpl.html',
//            controller:'NewsListCtrl',
//            resolve:{
//				items: ['News', function (News) {
//                    return News.all();
//                }]
//            }
//        });
//    }])

	.factory('News', ['dataResource',
		function ($dataResource) {

			var News = $dataResource('news');

			return News;
		}
	])

	.filter('startsWithLetter', function () {
		return function (items, search) {
			var filtered = [];

			if (items) {
				var searchMatch = new RegExp(search, 'i');

				for (var i = 0; i < items.length; i++) {
					var item = items[i];

					if (searchMatch.test(item.name) || searchMatch.test(item.email) ) {
						filtered.push(item);
					}
				}
				return filtered;
			}
			return filtered;
		};
	})

	.controller('NewsListCtrl', ['$scope', '$location', 'items', 'i18nNotifications',
		function ($scope, $location, items, i18nNotifications) {
            $scope.items = items;

			// Show on page control
			$scope.itemLimits = {
				'10': 10,
				'20': 20,
				'30': 30,
				'40': 40,
				'50': 50
			};
			$scope.limit = 10;

			// Filter logics
			$scope.showFilder = false;

			$scope.searchByFilter = function() {
				i18nNotifications.pushForCurrentRoute('crud.news.remove.success', 'success', {});
			};

			$scope.toggleFilter = function() {
				$scope.showFilder = !($scope.showFilder);
			};

			$scope.open = function($event, opened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.closeAll();
				$scope.datepickers[opened] = true;
			};
			$scope.closeAll = function() {
				$scope.datepickers = [];
			};

			// Sort logics
			$scope.sortField = 'id';
			$scope.reverse = true;

			$scope.sort = function(fieldName) {
				if($scope.sortField === fieldName) {
					$scope.reverse = true;
				} else {
					$scope.sortField = fieldName;
					$scope.reverse = false;
				}
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.sortField === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.sortField === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.active);
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.block);
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.correction);
			};

			$scope.changeStatus = function(item, $index, $event) {

			};

        }
    ]);