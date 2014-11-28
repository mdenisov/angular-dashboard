angular.module('users-edit-validateEmails', [])

    /**
 * A validation directive to ensure that this model has the same value as some other
 */
    .directive('validateEmail', function() {
        return {
            require:'ngModel',
            restrict:'A',
            link: function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if (re.test(viewValue)) {
                            ctrl.$setValidity('validateEmail', true);
                        } else {
                            ctrl.$setValidity('validateEmail', false);
                        }

                        return viewValue;
                    }
                });
            }
        };
    });