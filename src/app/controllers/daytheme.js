
angular.module('daytheme', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Daytheme', '', ['Тема дня', 'новости'])
			.whenList({
				items: ['News', function(News) {
					return News.all();
				}]
			})
			.whenNew({
				item: ['News', function(News) {
					return new News();
				}]
			})
			.whenEdit({
				item: ['$route', 'News', function ($route, News) {
					return News.getById($route.current.params.itemId);
				}]
			});

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

    .controller('NewsDaythemeListCtrl', ['$scope', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = items;

			angular.extend($scope, crudListMethods('/news/daytheme'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 5;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

			$scope.filter = function() {
				$timeout(function() {

					$scope.currentPage = 1;
					$scope.filteredItems = $scope.filtered.length;

				}, 10);
			};

			$scope.resetFilter = function() {
				$scope.search = {};
				$scope.date = {};
				$scope.ids = {};
			};

			$scope.toggleFilter = function() {
				$scope.showFilter = !($scope.showFilter);
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
			$scope.orderBy = 'id';
			$scope.reverse = true;

			$scope.sort = function(orderBy) {
				$scope.orderBy = orderBy;
				$scope.reverse = !$scope.reverse;
			};

			$scope.isSortUp = function(fieldName) {
				return $scope.orderBy === fieldName && !$scope.reverse;
			};

			$scope.isSortDown = function(fieldName) {
				return $scope.orderBy === fieldName && $scope.reverse;
			};

			// Items logic
			$scope.toggleActiv = function(item, $index, $event) {
				item.active = !(item.active);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.block);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.correction);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.changeStatus = function(item, $index, $event) {

			};

		}
	])

	.controller('NewsDaythemeEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications',
		function ($scope, $location, item, i18nNotifications) {

			$scope.item = item;

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/daytheme');
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