
angular.module('app', [
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
		'ngSwitcher',
		'cgNotify',
		'ng-breadcrumbs',
		'angular-redactor',
        'lr.upload',
		'ngTagsInput',

        'ui.bootstrap',
        'ui.bankiru',

        'services.i18nNotifications',
        'directives.crud',

        'home',
		'daytheme',
		'history',
		'topic',
		'settings',

		'templates.app',
		'templates.common'
    ])

    .constant('I18N.MESSAGES', {
        'errors.validation.required': 'Обязательно для заполнения.',
        'errors.validation.invalid.email': 'Обязательно для заполнения.',
        'errors.validation.invalid.url': 'Неверная ссылка.',

        'errors.upload.save.error':"При загрузке файла произошла ошибка.",
        'errors.upload.save.success':"Файла успешно загружен.",
        'errors.upload.remove.error':"При удалении файла произошла ошибка.",

        'errors.system.general': 'Произошла системная ошибка.',

        'errors.route.changeError':'Ошибка роутинга.',

        'crud.news.save.success':"Элемент с номером '{{id}}' успешно сохранен.",
        'crud.news.update.success':"Элемент с номером '{{id}}' успешно обновлен.",
        'crud.news.remove.success':"Элемент с номером '{{id}}' успешно удален.",
        'crud.news.remove.error':"При удалении элемента с номером '{{id}}' произошла ошибка",
        'crud.news.save.error':"При сохранении элемента с номером '{{id}}' произошла ошибка."
    })

    .constant('CONFIG', {
        //baseUrl: '/api/index.php'
        baseUrl: ''
    })

	.config(['$resourceProvider', function($resourceProvider) {
		// Don't strip trailing slashes from calculated URLs
		$resourceProvider.defaults.stripTrailingSlashes = false;
	}])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo:'/news'});
    }])

	.config(function(redactorOptions) {
		redactorOptions.lang = 'ru';
		redactorOptions.observeLinks = true;
		redactorOptions.convertVideoLinks = true;
		redactorOptions.buttonSource = true;
		redactorOptions.emoveEmpty = ['strong', 'em', 'span', 'p'];
		redactorOptions.toolbarFixed = false;
		//redactorOptions.toolbarFixedTarget = '.page';
		//redactorOptions.toolbarFixedTopOffset = 195;
		//redactorOptions.scrollTarget = '.page';
		redactorOptions.maxHeight = 800;
		//redactorOptions.plugins = ['table','fullscreen'];
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

	.config(function(tagsInputConfigProvider) {
		tagsInputConfigProvider
			.setDefaults('tagsInput', {
				placeholder: 'New tag',
				addOnEnter: false
			})
			.setDefaults('autoComplete', {
				maxResultsToShow: 10,
				debounceDelay: 1000
			})
			.setActiveInterpolation('tagsInput', {
				placeholder: true,
				addOnEnter: true,
				removeTagSymbol: true
			})
			.setTextAutosizeThreshold(15);
	})

    .controller('AppCtrl', ['$scope', '$location', 'i18nNotifications', 'breadcrumbs', 'localizedMessages', 'notify',
        function($scope, $location, i18nNotifications, breadcrumbs, localizedMessages, $notify) {

            $scope.notifications = i18nNotifications;
			$scope.breadcrumbs = breadcrumbs;
			$scope.$notify = $notify;


			$scope.messages = {
				validation: {
					required: localizedMessages.get('errors.validation.required'),
					invalidEmail: localizedMessages.get('errors.validation.invalid.email'),
					invalidUrl: localizedMessages.get('errors.validation.invalid.url')
				}
			};

			$scope.$notify.config({
                startTop: 110,
				container: $('.page'),
                templateUrl: 'views/notify.tpl.html'
            });

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
                i18nNotifications.push('errors.route.changeError', 'error', {}, {rejection: rejection});
            });

			// Toggle Sidebar
			$scope.showSidebar = false;
			$scope.toggleMenu = function() {
				$scope.showSidebar = !$scope.showSidebar;
			};

			$scope.home = function () {
				$location.path('/news');
			};
			
			$scope.otherServices = '<ul class="services"><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li><li class="services__item"><a href=""><span class="services__icon"><img src="assets/img/logo.png" alt=""/></span><span class="services__name">Title</span></a></li></ul>';
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