
angular.module('app', [
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
		'ngSwitcher',
		'ng-breadcrumbs',
		'angular-redactor',

        'ui.bootstrap',

        'services.i18nNotifications',
        'directives.crud',

        'home',
		'daytheme',
		'settings',

		'templates.app',
		'templates.common'
    ])

    .constant('I18N.MESSAGES', {
        'errors.validation.required': 'Обязательно для заполнения.',
        'errors.validation.invalid.email': 'Обязательно для заполнения.',
        'errors.validation.invalid.url': 'Неверная ссылка.',

        'errors.system.general': 'Произошла системная ошибка.',

        'errors.route.changeError':'Ошибка роутинга.',

        'crud.news.save.success':"Элемент с номером '{{id}}' успешно сохранен.",
        'crud.news.remove.success':"Элемент с номером '{{id}}' успешно удален.",
        'crud.news.remove.error':"При удалении элемента с номером '{{id}} произошла ошибка'.",
        'crud.news.save.error':"При удалении элемента произошла ошибка"
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
			html = html.replace(/ - /g, ' � ');

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
                return httpRequestTracker.hasPendingRequests();
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
				$location.path('/news');
			};
        }
    ])

    .controller('SidebarCtrl', ['$scope', '$location', '$route',
        function ($scope, $location, $route) {

			$scope.isActive = function(path) {
                return $location.path().substr(0, path.length) === path;
			};

			$scope.home = function () {
				$location.path('/news');
			};

        }
    ])

    .run(function ($rootScope, $timeout) {
        $rootScope.page = $('.page');
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function() {
                $rootScope.page.scrollTop(0, 0);
            }, 100);
        });
    });