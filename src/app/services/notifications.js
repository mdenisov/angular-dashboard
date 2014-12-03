angular.module('services.notifications', ['cgNotify'])
	.factory('notifications', ['$rootScope', 'notify', function ($rootScope, $notify) {

		var notifications = {
			'STICKY' : [],
			'ROUTE_CURRENT' : [],
			'ROUTE_NEXT' : []
		};
		var notificationsService = {};

		var addNotification = function (notificationsArray, notificationObj) {
			if (!angular.isObject(notificationObj)) {
				throw new Error("Only object can be added to the notification service");
			}
			$notify(notificationObj);
		};

		$rootScope.$on('$routeChangeSuccess', function () {

		});

		notificationsService.push = function(notification) {
			return addNotification(notifications.STICKY, notification);
		};

		notificationsService.remove = function(){

		};

		return notificationsService;
	}]);