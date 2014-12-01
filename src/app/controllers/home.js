
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

	.filter('newsFilter', function () {
        return function(input, start) {
            if (input) {
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        };
	})

	.controller('NewsHomeListCtrl', ['$scope', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, crudListMethods, items, i18nNotifications, $timeout) {
            $scope.items = items;

			angular.extend($scope, crudListMethods('/news'));

            // pagination controls
            $scope.currentPage = 1;
            $scope.filteredItems = $scope.items.length;
            $scope.entryLimit = 5;
            $scope.totalItems = $scope.items.length;

			// Filter logics
			$scope.showFilter = false;

            $scope.filter = function() {
                $timeout(function() {

                    $scope.currentPage = 1;
                    $scope.filteredItems = $scope.filtered.length;

                }, 10);
            };

            $scope.setPage = function() {
                //$timeout(function() {



                //}, 10);
            };

			$scope.searchByFilter = function() {
				i18nNotifications.pushForCurrentRoute('errors.system.general', 'error', {});
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

				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.block);
				item.$update(function() {

				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.correction);
				item.$update(function() {

				});
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