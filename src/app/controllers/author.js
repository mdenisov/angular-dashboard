
angular.module('author', [
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

		crudRouteProvider.routesFor('News', 'Author', 'Author', ['Авторы', 'новости'])

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

    .controller('NewsAuthorListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
		function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
			$scope.items = $scope.filtered = items;

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

			angular.extend($scope, crudListMethods('/news/author'));

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
				item.active = !(item.isActive());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleBlock = function(item, $index, $event) {
				item.block = !(item.isBlocked());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.toggleCorrection = function(item, $index, $event) {
				item.correction = !(item.isNeedCorrection());
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

			$scope.copy = function(item, $index, $event) {
				var newItem = angular.copy(item);
				newItem.id = undefined;

				newItem.$save(function(item) {
//					$scope.items.push(item);
					$location.path('/news/author/' + item.$id());
					i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				});
			};

			$scope.history = function(item, $index, $event) {
				$location.path('/news/author/history/' + item.$id());
			};

			$scope.remove = function(item, $index, $event) {
				item.$delete(function() {
					$scope.filtered.splice($index,1);
					i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				});
			};

			$scope.showStatusChanger = function(item, $index, $event) {
				item.showStatusChanger = !(item.showStatusChanger);
			};
			$scope.changeStatus = function(item, $index, $event) {
				$scope.showStatusChanger(item, $index, $event);
				item.$update(function() {
					i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
				});
			};

		}
	])

	.controller('NewsAuthorEditCtrl', ['$scope', 'CONFIG', '$location', '$timeout', 'item', 'i18nNotifications', 'upload',
		function ($scope, CONFIG, $location, $timeout, item, i18nNotifications, upload) {

			$scope.item = item;
			$scope.item.image = $scope.item.image || {};
			$scope.item.illustrations = $scope.item.illustrations || [];

			$scope.redactorOptions = {
				buttons: ['formatting', '|', 'bold', 'italic']
			};

			$scope.onSave = function (item) {
				i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
				$location.path('/news/author');
			};

			$scope.onError = function() {
				i18nNotifications.push('crud.news.save.error', 'error');
			};

			$scope.onRemove = function(item) {
				i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
				$location.path('/news/author');
			};

			// Image uploader
			$scope.removeImage = function() {
				$scope.item.image = {};
			};
			$scope.onImageError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onImageComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					$scope.item.image.src = CONFIG.uploadUrl + response.data.files[0].localName;
				}, 1500);
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.image = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				$timeout(function() {
					i18nNotifications.push('errors.upload.save.success', 'success');
					angular.forEach(response.data.files, function (image) {
						$scope.item.illustrations.push({src: CONFIG.uploadUrl + image.localName});
					});
				}, 1500);
			};
			$scope.selectedAll = false;
			$scope.selectedAny = false;
			$scope.isSelectedAllIllustrationItems = function() {
				var selectedAll = true;
				$scope.selectedAny = false;
				angular.forEach($scope.item.illustrations, function (item) {
					if (!(item.selected)) {
						selectedAll = false;
					} else {
						$scope.selectedAny = true;
					}
				});
				$scope.selectedAll = selectedAll;
				return selectedAll;
			};
			$scope.selectIllustrationItem = function(item, $index, $event) {
				item.selected = !(item.selected);
				$scope.isSelectedAllIllustrationItems();
			};
			$scope.selectIllustrationItems = function() {
				$scope.selectedAll = $scope.selectedAny = !($scope.selectedAll);
				angular.forEach($scope.item.illustrations, function (item) {
					item.selected = $scope.selectedAll;
				});
			};
			$scope.removeIllustrationItem = function() {
				angular.forEach($scope.item.illustrations, function (item, index) {
					if (item.selected) {
						$scope.item.illustrations.splice(index, 1);
					}
				});
			};
		}
	]);