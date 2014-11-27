
angular.module('index', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',
        'show-errors'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl:'js/app/news/index-list.tpl.html',
            controller:'IndexViewCtrl',
            resolve:{
				news: ['Users', function (News) {
                    return News.all();
                }]
            }
        });
    }])

	.factory('News', ['dataResource',
		function ($dataResource) {

			var News = $dataResource('news');

			News.forUser = function(userId, successcb, errorcb) {
				//TODO: get projects for this user only (!)
				return Projects.query({}, successcb, errorcb);
			};

			News.prototype.isProductOwner = function (userId) {
				return this.productOwner === userId;
			};
			News.prototype.canActAsProductOwner = function (userId) {
				return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
			};
			News.prototype.isScrumMaster = function (userId) {
				return this.scrumMaster === userId;
			};
			News.prototype.canActAsScrumMaster = function (userId) {
				return !this.isProductOwner(userId);
			};
			News.prototype.isDevTeamMember = function (userId) {
				return this.teamMembers.indexOf(userId) >= 0;
			};
			News.prototype.canActAsDevTeamMember = function (userId) {
				return !this.isProductOwner(userId);
			};

			News.prototype.getRoles = function (userId) {
				var roles = [];
				if (this.isProductOwner(userId)) {
					roles.push('PO');
				} else {
					if (this.isScrumMaster(userId)){
						roles.push('SM');
					}
					if (this.isDevTeamMember(userId)){
						roles.push('DEV');
					}
				}
				return roles;
			};

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

    .controller('IndexViewCtrl', ['$scope', '$location', 'news',
        function ($scope, $location, news) {
            $scope.news = news;

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