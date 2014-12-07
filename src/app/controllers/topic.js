
angular.module('topic', [
        'services.crud',
        'dataResource',

        'services.i18nNotifications',

        'resources.topic',

        'filters.pagination'
    ])

    .config(['crudRouteProvider', function (crudRouteProvider) {

        crudRouteProvider.routesFor('Topic', 'Topic', '', ['Сюжеты', 'Сюжета'])

            .whenList({
                items: ['Topic', function(Topic) {
                    return Topic.all();
                }]
            })
            .whenNew({
                item: ['Topic', function(Topic) {
                    return new Topic();
                }]
            })
            .whenEdit({
                item: ['$route', 'Topic', function ($route, News) {
                    return News.getById($route.current.params.itemId);
                }]
            });

    }])

    .controller('TopicListCtrl', ['$scope', '$location', 'crudListMethods', 'items', 'i18nNotifications', '$timeout',
        function ($scope, $location, crudListMethods, items, i18nNotifications, $timeout) {
            $scope.items = $scope.filtered = items;

            angular.forEach($scope.items, function (item) {
                item.id = parseFloat(item.id);
            });

            angular.extend($scope, crudListMethods('/topic'));

            // pagination controls
            $scope.currentPage = 1;
            $scope.filteredItems = $scope.items.length;
            $scope.entryLimit = 20;
            $scope.totalItems = $scope.items.length;

            $scope.canCreateNew = true;

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
            $scope.toggleActive = function(item, $index, $event) {
                item.active = !(item.active);
                item.$update(function() {
                    i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
                });
            };

            $scope.toggleShowInBlock = function(item, $index, $event) {
                item.show_in_block = !(item.show_in_block);
                item.$update(function() {
                    i18nNotifications.push('crud.news.update.success', 'success', {id : item.$id()});
                });
            };

        }
    ])

    .controller('TopicEditCtrl', ['$scope', '$location', 'item', 'i18nNotifications', 'upload',
        function ($scope, $location, item, i18nNotifications, upload) {

            $scope.item = item;

            $scope.redactorOptions = {
                buttons: ['formatting', '|', 'bold', 'italic']
            };

            $scope.onSave = function (item) {
                i18nNotifications.push('crud.news.save.success', 'success', {id : item.$id()});
                $location.path('/topic');
            };

            $scope.onError = function() {
                i18nNotifications.push('crud.news.save.error', 'error');
            };

            $scope.onRemove = function(item) {
                i18nNotifications.push('crud.news.remove.success', 'success', {id : item.$id()});
                $location.path('/topic');
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
                $scope.item.image = response.data.file;
            };

        }
    ]);