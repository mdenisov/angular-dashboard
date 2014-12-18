describe('NewsCtrl', function() {

    beforeEach(module('home'));

    describe('NewsListCtrl', function () {
        it('should call crudListMethods', inject(function($controller, $rootScope) {
            var locals = {
				$scope: $rootScope,
				$location: jasmine.createSpyObj('$location', ['path']),
				crudListMethods: jasmine.createSpy('crudListMethods'),
				items: {},
				i18nNotifications: jasmine.createSpyObj('i18nNotifications', ['push']),
				$timeout: jasmine.createSpy('$timeout')
            };
            var ctrl = $controller('NewsListCtrl', locals);

            expect($rootScope.items).toBe(locals.items);
            expect(locals.crudListMethods).toHaveBeenCalled();
        }));
    });

    describe('NewsEditCtrl', function () {

        function createLocals() {
            return {
				$scope: {},
                CONFIG: {},
				$location: jasmine.createSpyObj('$location', ['path']),
                $timeout: {},
				item: { $id: function() { return 'X'; } },
				i18nNotifications: jasmine.createSpyObj('i18nNotifications', ['push']),
				upload: {}
            };
        }

        function runController(locals) {
            inject(function($controller) {
                $controller('NewsEditCtrl', locals);
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

            expect(locals.i18nNotifications.push).toHaveBeenCalled();
            expect(locals.i18nNotifications.push.calls.mostRecent().args[1]).toBe('success');
            expect(locals.$location.path).toHaveBeenCalled();
        });

        it('should display an error message in onError', function() {
            var locals = createLocals();
            runController(locals);

            locals.$scope.onError();

            expect(locals.i18nNotifications.push).toHaveBeenCalled();
            expect(locals.i18nNotifications.push.calls.mostRecent().args[1]).toBe('error');
        });

    });

});