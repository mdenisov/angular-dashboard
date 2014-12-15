
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

			//angular.forEach($scope.items, function (item) {
			//	item.id = parseFloat(item.id);
			//});

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

	.service('Products', function($q) {
		var tags = [
			{id: 1, name: 'Вклады'},
			{id: 2, name: 'Ипотечные кредиты'},
			{id: 3, name: 'Потребительские кредиты'},
			{id: 4, name: 'Кредитные карты'},
			{id: 5, name: 'Дебетовые карты'},
			{id: 6, name: 'Автокредиты'},
			{id: 7, name: 'Кредитование малого и среднего бизнеса'},
			{id: 8, name: 'Обслуживание юрлиц'},
			{id: 9, name: 'Лизинг'},
			{id: 10, name: 'Дистанционное обслуживание'},
			{id: 11, name: 'Финансовая грамотность'},
			{id: 12, name: 'Реструктуризация кредитов'},
			{id: 13, name: 'БКИ'},
			{id: 14, name: 'Микрозаймы'},
			{id: 15, name: 'Страхование'}
		];

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Banks', function($q) {
		var tags = [
			{id: 1, name: 'АльфаБанк'},
			{id: 2, name: 'Сбербанк'},
			{id: 3, name: 'Промсвязь банк'},
			{id: 4, name: 'УралСиб банк'}
		];

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('BanksInfo', function($q) {
		var tags = [
			{id: 1, name: 'Укрэксимбанк(Киев) (ID: 289539)'},
			{id: 2, name: 'Фидобанк(Киев) (ID: 289529)'},
			{id: 3, name: 'АзияУниверсалБанк(Бишкек) (ID: 1334114)'},
			{id: 4, name: 'Легбанк(Киев) (ID: 284663)'}
		];

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.service('Mfo', function($q) {
		var tags = [
			{id: 1, name: 'Домашние деньги (ID: 1)'},
			{id: 2, name: 'Нано-Финанс (ID: 2)'},
			{id: 3, name: 'Pay P. S. (ID: 3)'},
			{id: 4, name: 'Быстроденьги (ID: 4)'}
		];

		this.load = function() {
			var deferred = $q.defer();
			deferred.resolve(tags);
			return deferred.promise;
		};
	})

	.controller('NewsDaythemeEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications', 'upload', 'Products', 'Banks', 'BanksInfo', 'Mfo',
		function ($scope, $location, item, i18nNotifications, upload, Products, Banks, BanksInfo, Mfo) {

			$scope.item = item;
			$scope.item.illustrations = [];

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
				$scope.item.image = response.data.files[0].fd;
			};

			// llIllustrations
			$scope.removeIllustrationsImage = function() {
				//$scope.item.illustrations = undefined;
			};
			$scope.onIllustrationsError = function (response) {
				i18nNotifications.push('errors.upload.save.error', 'error');
			};
			$scope.onIllustrationsComplete = function (response) {
				i18nNotifications.push('errors.upload.save.success', 'success');
				var image = {};
				image.src = response.data.files[0].fd;
				$scope.item.illustrations.push(image);
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

			// Autocomplete
			$scope.getProducts = function(query) {
				return Products.load();
			};
			$scope.getBanks = function(query) {
				return Banks.load();
			};
			$scope.getBanksInfo = function(query) {
				return BanksInfo.load();
			};
			$scope.getMfo = function(query) {
				return Mfo.load();
			};


		}
	]);