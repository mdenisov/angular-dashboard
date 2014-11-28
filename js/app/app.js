
angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
		'ngSwitcher',
		'ng-breadcrumbs',
		'angular-redactor',

        'ui.bootstrap',

        'services.i18nNotifications',
        'directives.crud',

        'news',
		'daytheme',
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

	.config(function(redactorOptions) {
		redactorOptions.lang = 'ru';
		redactorOptions.observeLinks = true;
		redactorOptions.convertVideoLinks = true;
		redactorOptions.buttonSource = true;
		redactorOptions.emoveEmpty = ['strong', 'em', 'span', 'p'];
		redactorOptions.pasteBeforeCallback = function(html) {
			html = html.replace(/<br[^>]*>/g, '');
			html = html.replace(/(<font style=\".+?\">|<font face=\".+?\">|<\/font>)/g, '');
			html = html.replace(/(<span style=\".+?\">|<span class=\".+?\">|<\/span>)/g, '');
			html = html.replace(/(<tt>|<\/tt>)/g, '');
			html = html.replace(/(<span style=\"[\s\S]*?\">)/g, '');
			html = html.replace(/\\n+/g, ' ');
			html = html.replace(/ style=\"[^{>,\"}]*\"/g, '');
			html = html.replace(/ class=\"[^{>,\"}]*\"/g, '');
			html = html.replace(/<h1[^>]*>/g, '<p>');
			html = html.replace(/<\/h1>/g, '</p>');
			html = html.replace(/<h2[^>]*>/g, '<p>');
			html = html.replace(/<\/h2>/g, '</p>');
			html = html.replace(/<h3[^>]*>/g, '<p>');
			html = html.replace(/<\/h3>/g, '</p>');
			html = html.replace(/<b[^>]*>/g, '<strong>');
			html = html.replace(/<\/b>/g, '</strong>');
			html = html.replace(/<i[^>]*>/g, '<em>');
			html = html.replace(/<\/i>/g, '</em>');
			html = html.replace(/<big[^>]*>/g, '<strong>');
			html = html.replace(/<\/big>/g, '</strong>');
			html = html.replace(/<strike[^>]*>/g, '<del>');
			html = html.replace(/<\/strike>/g, '</del>');
			html = html.replace(/ - /g, ' — ');

			return html;
		};
	})

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