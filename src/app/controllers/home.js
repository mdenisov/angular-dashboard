
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

	.filter('startsWithA', function () {
		return function (items) {
			var filteredResult = [];

			if (query) {

				items.forEach(function(item) {
					if (/a/i.test(item.name.substring(0, 1))) {
						filteredResult.push(item);
					}
				});

			} {
				return items;
			}

			return filteredResult;
		};
	})

	.filter('titleFilter', function() {
		return function(items, query) {
			var filteredResult = [];

			// Take action if the filter elements are filled
			if (query) {

				items.forEach(function(item) {
					if (parseDateFromUtc(item.date_start) >= parsedStartDate && parseDateFromUtc(item.date_finish) <= parsedEndDate) {
						filteredResult.push(item);
					}
				});

			} else {
				return items; // By default, show the regular table data
			}

			return filteredResult;
		}
	})

	.filter('dateStartRangeFilter', function() {
		return function(items, startDate, endDate) {
			var filteredResult = [];

			// Parse from the filter format 'dd/mm/yyyy' (Turkish culture)
			function parseDateFromFilter(strDate) {
//				var parts = strDate.split(' ');
//				return new Date(parts[2], parts[1] - 1, parts[0]);
				return new Date(strDate);
			}

			// Parse the UTC time data from JSON source
			function parseDateFromUtc(utcStr) {
				return new Date(utcStr);
			}

			// Defaults
//			var parsedStartDate = startDate ? parseDateFromFilter(startDate) : new Date(1900, 1, 1);
//			var parsedEndDate = endDate ? parseDateFromFilter(endDate) : new Date();
			var parsedStartDate = startDate ? parseDateFromUtc(startDate) : new Date(1900, 1, 1);
			var parsedEndDate = endDate ? parseDateFromUtc(endDate) : new Date();

			// Take action if the filter elements are filled
			if (typeof startDate !== "undefined" || typeof endDate !== "undefined") {

				items.forEach(function(item) {
					if (parseDateFromUtc(item.date_start) >= parsedStartDate && parseDateFromUtc(item.date_finish) <= parsedEndDate) {
						filteredResult.push(item);
					}
				});

			} else {
				return items; // By default, show the regular table data
			}

			return filteredResult;
		}
	})

	.filter('idRangeFilter', function() {
		return function(items, startId, endId) {
			var filteredResult = [];

			var idFrom = startId ? parseInt(startId,10) : 1;
			var idTo = endId ? parseInt(endId,10) : 4294967296;

			// Take action if the filter elements are filled
			if (startId || endId) {

				items.forEach(function(item) {
					if (parseInt(item.id,10) >= idFrom && parseInt(item.id,10) <= idTo) {
						filteredResult.push(item);
					}
				});

			} else {
				return items; // By default, show the regular table data
			}

			return filteredResult;
		}
	})

	.controller('NewsHomeListCtrl', ['$scope', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, crudListMethods, items, i18nNotifications, $timeout) {
            $scope.items = items;

			angular.extend($scope, crudListMethods('/news/edit'));

            // pagination controls
            $scope.currentPage = 1;
            $scope.filteredItems = $scope.items.length;
            $scope.entryLimit = 5;
            $scope.totalItems = $scope.items.length;

			$scope.canCreateNew = false;

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

	.controller('NewsHomeEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications',
		function ($scope, $location, item, i18nNotifications) {

			$scope.item = item;

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
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