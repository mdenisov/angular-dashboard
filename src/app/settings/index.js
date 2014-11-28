
angular.module('settings', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',
        'show-errors'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
			name: 'Настройки',
            templateUrl:'js/app/settings/index.tpl.html',
            controller:'SettingsViewCtrl',
            resolve:{
				settings: ['Settings', function (Settings) {
                    return Settings.all();
                }]
            }
        });
    }])

	.factory('Settings', ['dataResource',
		function ($dataResource) {

			var Settings = $dataResource('settings');

			return Settings;
		}
	])

    .controller('SettingsViewCtrl', ['$scope', '$location', 'settings',
        function ($scope, $location, settings) {
            $scope.settings = settings;



        }
    ]);