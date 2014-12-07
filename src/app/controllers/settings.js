
angular.module('settings', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

        'resources.settings'
    ])

    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Settings', 'Settings', '', ['Настройки', 'Настроек'])
            .when('/settings', {
                label: 'Редактирование настроек',
                templateUrl:'views/settings/edit.tpl.html',
                controller:'SettingsEditCtrl',
                resolve:{
                    item: ['$route', 'Settings', function ($route, Settings) {
                        return Settings.getById(1);
                    }]
                }
            })

    }])

    .controller('SettingsEditCtrl', ['$scope', '$location', 'crudListMethods', 'item', 'i18nNotifications',
        function ($scope, $location, crudListMethods, item, i18nNotifications) {
            $scope.item = item;

            angular.extend($scope, crudListMethods('/settings'));

            $scope.onSave = function (item) {
                i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
            };

            $scope.onError = function() {
                i18nNotifications.push('crud.news.save.error', 'error');
            };
        }
    ]);