
angular.module('daytheme', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

		'resources.news',

		'filters.startsWithA',
		'filters.idRange',
		'filters.dateStartRange',
		'filters.pagination'
    ])

	.config(['crudRouteProvider', function (crudRouteProvider) {

		crudRouteProvider.routesFor('News', 'Daytheme', 'Daytheme', ['Тема дня', 'новости'])

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

    .controller('NewsDaythemeListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			angular.forEach($scope.items, function (item) {
				item.id = parseFloat(item.id);
			});

			angular.extend($scope, crudListMethods('/news/daytheme'));

			// pagination controls
			$scope.currentPage = 1;
			$scope.filteredItems = $scope.items.length;
			$scope.entryLimit = 20;
			$scope.totalItems = $scope.items.length;

			$scope.canCreateNew = true;

			// Filter logics
			$scope.showFilter = false;

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

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/daytheme/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/daytheme/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.changeStatus = function(item, $index, $event) {

			};

		}
	])

	.controller('NewsDaythemeEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications', 'upload',
		function ($scope, $location, item, i18nNotifications, upload) {

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

            // File uploader
            $scope.acceptTypes = 'image/*';
            $scope.removeImage = function() {
                $scope.item.image = undefined;
            };
            $scope.onError = function (response) {
                i18nNotifications.push('errors.upload.save.error', 'error');
            };
            $scope.onComplete = function (response) {
                i18nNotifications.push('errors.upload.save.success', 'success');
                $scope.item.image = response.data.file;
            };

		}
	]);