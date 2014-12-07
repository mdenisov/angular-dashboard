
function crudRouteProvider($routeProvider) {

    this.$get = angular.noop;

    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider.routesFor('MyBook', '/myApp');
    // });
    // ```
    //
    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider('MyBook', '/myApp');
    // });
    // ```
    //
    // In any case, the point is that this function is the key part of this "provider helper".
    // We use it to create routes for CRUD operations.  We give it some basic information about
    // the resource and the urls then it it returns our own special routeProvider.
    this.routesFor = function(resourceName, moduleName, routePrefix, labels) {
        var baseUrl = resourceName.toLowerCase();
        var baseRoute = '/' + resourceName.toLowerCase();
        var baseTplUrl = baseUrl;
        var routeLabels = [];
        //routePrefix = routePrefix || moduleName;

        // Prepend the urlPrefix if available.
        //if (angular.isString(urlPrefix) && urlPrefix !== '') {
        //    baseUrl = baseUrl + '/' + urlPrefix.toLowerCase();
			//baseTplUrl = baseTplUrl + '/' + urlPrefix.toLowerCase();
        //}

        // Prepend the routePrefix if it was provided;
        if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
            baseRoute = baseRoute + '/' + routePrefix.toLowerCase();
        }

		// Labels for breadcrumbs
		// ['Разделы', 'Раздела']
		if (labels !== null && labels !== undefined && labels !== '' && angular.isArray(labels) && labels.length === 2) {
			routeLabels[0] = labels[0];
			routeLabels[1] = 'Добавление ' + labels[1].toLowerCase();
			routeLabels[2] = 'Редактирование ' + labels[1].toLowerCase();
			routeLabels[3] = 'Просмотр ' + labels[1].toLowerCase();
		}

        // Create the templateUrl for a route to our resource that does the specified operation.
        var templateUrl = function(operation) {
            return 'views' + '/' + moduleName.toLowerCase() + '/' + operation.toLowerCase() + '.tpl.html';
        };
        // Create the controller name for a route to our resource that does the specified operation.
        var controllerName = function(operation) {
            return resourceName + routePrefix + operation + 'Ctrl';
        };

        // This is the object that our `routesFor()` function returns.  It decorates `$routeProvider`,
        // delegating the `when()` and `otherwise()` functions but also exposing some new functions for
        // creating CRUD routes.  Specifically we have `whenList(), `whenNew()` and `whenEdit()`.
        var routeBuilder = {
            // Create a route that will handle showing a list of items
            whenList: function(resolveFns) {
                routeBuilder.when(baseRoute, {
					label: routeLabels[0] || '',
                    templateUrl: templateUrl('List'),
                    controller: controllerName('List'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle creating a new item
            whenNew: function(resolveFns) {
                routeBuilder.when(baseRoute + '/new', {
					label: routeLabels[1] || '',
                    templateUrl: templateUrl('Edit'),
                    controller: controllerName('Edit'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle editing an existing item
            whenEdit: function(resolveFns) {
                routeBuilder.when(baseRoute + '/:itemId', {
					label: routeLabels[2] || '',
                    templateUrl: templateUrl('Edit'),
                    controller: controllerName('Edit'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Create a route that will handle viewing an existing item
            whenView: function(resolveFns) {
                routeBuilder.when(baseRoute + '/:itemId', {
					label: routeLabels[3] || '',
                    templateUrl: templateUrl('View'),
                    controller: controllerName('View'),
                    resolve: resolveFns
                });
                return routeBuilder;
            },
            // Pass-through to `$routeProvider.when()`
            when: function(path, route) {
                $routeProvider.when(path, route);
                return routeBuilder;
            },
            // Pass-through to `$routeProvider.otherwise()`
            otherwise: function(params) {
                $routeProvider.otherwise(params);
                return routeBuilder;
            },
            // Access to the core $routeProvider.
            $routeProvider: $routeProvider
        };
        return routeBuilder;
    };
}

crudRouteProvider.$inject = ['$routeProvider'];

// Create our provider - it would be nice to be able to do something like this instead:
//
// ```
// angular.module('services.crudRouteProvider', [])
//   .configHelper('crudRouteProvider', ['$routeProvider, crudRouteProvider]);
// ```
// Then we could dispense with the $get, the $inject and the closure wrapper around all this.
angular.module('services.crudRouteProvider', ['ngRoute']).provider('crudRoute', crudRouteProvider);