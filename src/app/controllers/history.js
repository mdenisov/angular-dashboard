
angular.module('history', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.history',

		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'History', '', ['История изменений', 'Истории изменений'])

			.when('/news/history/:itemId', {
				label: 'Просмотр истории',
				templateUrl:'views/history/list.tpl.html',
				controller:'NewsHistoryListCtrl',
				resolve:{
					items: ['$route', 'History', function ($route, History) {
						return History.all();
					}]
				}
			})
			.when('/news/:category/history/:itemId', {
				label: 'Просмотр истории',
				templateUrl:'views/history/list.tpl.html',
				controller:'NewsHistoryListCtrl',
				resolve:{
					items: ['$route', 'History', function ($route, History) {
						return History.all();
					}]
				}
			})
			.when('/news/history/:itemId/revert/:commitId', {
				label: 'Редактирование новости',
				templateUrl:'views/history/edit.tpl.html',
				controller:'NewsHistoryEditCtrl',
				resolve:{
					item: ['$route', 'History', function ($route, History) {
						return History.getById($route.current.params.commitId);
					}]
				}
			});

	}])

    .controller('NewsHistoryListCtrl', ['$scope', '$route', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout', '$modal',
		function ($scope, $route, $location, crudListMethods, items, i18nNotifications, $timeout, $modal) {
			$scope.items = $scope.filtered = items;

			angular.forEach($scope.items, function (item) {
				item.id = parseFloat(item.id);
			});

			angular.extend($scope, crudListMethods('/news/history'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

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
			$scope.revert = function(id) {
				var itemId = $route.current.params.itemId;
				if (itemId) {
					$location.path('/news/history/' + itemId + '/revert/' + id);
				}
			};

			$scope.show = function(item, $index, $event) {
				var modalInstance = $modal.open({
					templateUrl: 'views/modals/history.tpl.html',
					controller: 'NewsHistoryModalCtrl',
					size: 'lg',
					resolve: {
						item: function () {
							return $scope.items[0];
						}
					}
				});
			};

		}
	])

	.controller('NewsHistoryEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications',
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
	])

	.controller('NewsHistoryModalCtrl', ['$scope', '$modalInstance', 'item', 'i18nNotifications',
		function ($scope, $modalInstance, item, i18nNotifications) {

			$scope.item = item;

			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};

		}
	]);