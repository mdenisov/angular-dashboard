describe('NewsCtrl', function() {

    beforeEach(module('news'));

    describe('AllNewsListCtrl', function () {
        it('should call crudListMethods', inject(function($controller, $rootScope) {
            var locals = {
                $scope: $rootScope,
                crudListMethods: jasmine.createSpy('crudListMethods'),
                items: {},
                i18nNotifications: jasmine.createSpyObj('i18nNotifications', ['pushForCurrentRoute', 'pushForNextRoute'])
            };
            var ctrl = $controller('AllNewsListCtrl', locals);

            expect($rootScope.items).toBe(locals.items);
            expect(locals.crudListMethods).toHaveBeenCalled();
        }));
    });

    describe('AllNewsEditCtrl', function () {

        function createLocals() {
            return {
                $scope: {},
                $location: jasmine.createSpyObj('$location', ['path']),
                i18nNotifications: jasmine.createSpyObj('i18nNotifications', ['pushForCurrentRoute', 'pushForNextRoute']),
                item: { $id: function() { return 'X'; } }
            };
        }

        function runController(locals) {
            inject(function($controller) {
                $controller('AllNewsEditCtrl', locals);
            });
        }

        it('should call setup a scope objects correctly', function() {
            var locals = createLocals();
            runController(locals);

            expect(locals.$scope.item).toBe(locals.item);
        });

        it('should call $location and display a success message in onSave', function() {
            var locals = createLocals();
            runController(locals);

            locals.$scope.onSave(locals.item);

            expect(locals.i18nNotifications.pushForNextRoute).toHaveBeenCalled();
            expect(locals.i18nNotifications.pushForNextRoute.calls.mostRecent().args[1]).toBe('success');
            expect(locals.$location.path).toHaveBeenCalled();
        });

        it('should display an error message in onError', function() {
            var locals = createLocals();
            runController(locals);

            locals.$scope.onError();

            expect(locals.i18nNotifications.pushForCurrentRoute).toHaveBeenCalled();
            expect(locals.i18nNotifications.pushForCurrentRoute.calls.mostRecent().args[1]).toBe('danger');
        });

    });

});