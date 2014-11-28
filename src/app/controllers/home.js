
angular.module('home', [
		'services.crud',
        'dataResource',

        'services.i18nNotifications'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Home', '', ['Новости', 'Новости'])
			.when('/news', {
				label: 'Новости',
				templateUrl:'views/home/list.tpl.html',
				controller:'NewsHomeListCtrl',
				resolve:{
					items: ['News', function(News) {
						return News.all();
					}]
				}
			})
			.when('/news/edit/:itemId', {
				label: 'Редактирование новости',
				templateUrl:'views/home/edit.tpl.html',
				controller:'NewsHomeEditCtrl',
				resolve:{
					item: ['$route', 'News', function ($route, News) {
						return News.getById($route.current.params.itemId);
					}]
				}
			})

	}])

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

	.controller('NewsHomeListCtrl', ['$scope', 'crudListMethods', 'items', 'i18nNotifications',
		function ($scope, crudListMethods, items, i18nNotifications) {
            $scope.items = items;

			angular.extend($scope, crudListMethods('/news'));

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
				i18nNotifications.pushForCurrentRoute('errors.system.general', 'error', {});
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
    ])

	.controller('NewsHomeEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications',
		function ($scope, $location, item, i18nNotifications) {

			$scope.item = item;

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.pushForNextRoute('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news');
			};

			$scope.onError = function() {
				i18nNotifications.pushForCurrentRoute('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.pushForNextRoute('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news');
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

		}
	]);