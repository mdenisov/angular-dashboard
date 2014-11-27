
angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
		'ngSwitcher',

        'ui.bootstrap',

        'services.i18nNotifications',
        'services.breadcrumbs',
        'directives.crud',

        'index',
		'daytheme',
        'users',
		'settings',

		'templates.app',
		'templates.common'
    ])

    .constant('I18N.MESSAGES', {
        'errors.route.changeError':'Route change error',

        'crud.news.save.success':"A news with id '{{id}}' was saved successfully.",
        'crud.news.remove.success':"A news with id '{{id}}' was removed successfully.",
        'crud.news.remove.error':"Something went wrong when removing news with id '{{id}}'.",
        'crud.news.save.error':"Something went wrong when saving a news..."
    })

    .constant('CONFIG', {
        baseUrl: '/api/index.php'
    })

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:'/news'});
    }])

    .controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'breadcrumbs',
        function($scope, $location, i18nNotifications, breadcrumbs) {

            $scope.notifications = i18nNotifications;
			$scope.breadcrumbs = breadcrumbs;

			$scope.isNavbarActive = function (navBarPath) {
				return navBarPath === breadcrumbs.getFirst().name;
			};

			$scope.hasPendingRequests = function () {
//                return httpRequestTracker.hasPendingRequests();
			};

            $scope.removeNotification = function (notification) {
                i18nNotifications.remove(notification);
            };

			$scope.$on('$routeChangeSuccess', function(event, current) {
				$scope.showSidebar = false;
			});

            $scope.$on('$routeChangeError', function(event, current, previous, rejection) {
                i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
            });

			// Toggle Sidebar
			$scope.showSidebar = false;
			$scope.toggleMenu = function() {
				$scope.showSidebar = !$scope.showSidebar;
			};

			$scope.home = function () {
				$location.path('/');
			};
        }
    ])

    .controller('SidebarCtrl', ['$scope', '$location', '$route',
        function ($scope, $location, $route) {

			$scope.currentPath = '/';

			$scope.$on('$routeChangeSuccess', function(event, current) {
//				$scope.currentPath = current.$$route.originalPath;
			});

			$scope.isActive = function(path) {
				return $scope.currentPath === path
			};

			$scope.home = function () {
				$location.path('/');
			};

        }
    ]);