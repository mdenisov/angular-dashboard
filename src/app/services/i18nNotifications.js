angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

    var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
        return angular.extend({
            message: localizedMessages.get(msgKey, interpolateParams),
            type: type,
            classes: type
        }, otherProperties);
    };

    var I18nNotifications = {
        push:function (msgKey, type, interpolateParams, otherProperties) {
            return notifications.push(prepareNotification(msgKey, type, interpolateParams, otherProperties));
        },
        remove:function (notification) {
            return notifications.remove(notification);
        }
    };

    return I18nNotifications;
}]);