angular.module('directives.crud.buttons', [])

    .directive('crudButtons', function () {
        return {
            restrict:'E',
            replace:true,
            template:
                '<div>' +
					'  <button type="button" class="btn btn-primary save" ng-click="save()" ng-disabled="!canSave()">Сохранить</button>' +
					'  <button type="button" class="btn btn-warning revert" ng-click="revertChanges()" ng-disabled="!canRevert()">Отменить</button>' +
					'  <button type="button" class="btn btn-danger remove" ng-click="remove()" ng-show="canRemove()">Удалить</button>' +
                '</div>'
        };
    });