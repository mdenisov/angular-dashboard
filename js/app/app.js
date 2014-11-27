
angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngSanitize',

        'ui.bootstrap',

        'services.i18nNotifications',
        'services.breadcrumbs',
        'directives.crud',

        'index',
        'users',
		'settings',

		'templates.app',
		'templates.common'
    ])

    .constant('I18N.MESSAGES', {
        'errors.route.changeError':'Route change error',
        'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
        'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
        'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
        'crud.user.save.error':"Something went wrong when saving a user...",
        'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
        'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
        'crud.project.save.error':"Something went wrong when saving a project...",
        'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
        'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
        'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
        'login.error.serverError': "There was a problem with authenticating: {{exception}}."
    })

    .constant('CONFIG', {
        baseUrl: '/api/index.php'
    })

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:'/'});
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
				$scope.currentPath = current.$$route.originalPath;
			});

			$scope.isActive = function(path) {
				return $scope.currentPath === path
			};

			$scope.home = function () {
				$location.path('/');
			};

        }
    ]);