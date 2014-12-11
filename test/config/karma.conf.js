// Karma configuration
// Generated on Fri Nov 28 2014 16:16:34 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'vendor/bower/jquery/dist/jquery.js',
		'vendor/redactor/redactor.js',
		'vendor/redactor/lang/ru.js',
		'vendor/redactor/plugins/fullscreen/fullscreen.js',
		'vendor/redactor/plugins/table/table.js',
		'vendor/redactor/plugins/clips/clips.js',
		'vendor/redactor/plugins/placeholders/placeholders.js',

		'vendor/bower/angular/angular.js',
		'vendor/bower/angular-route/angular-route.js',
		'vendor/bower/angular-resource/angular-resource.js',
		'vendor/bower/angular-sanitize/angular-sanitize.js',
		'vendor/bower/angular-aria/angular-aria.js',
		'vendor/bower/angular-cookies/angular-cookies.js',
		'vendor/bower/angular-sanitize/angular-sanitize.js',
		'vendor/bower/angular-touch/angular-touch.js',
		'vendor/bower/angular-messages/angular-messages.js',
		'vendor/bower/angular-bootstrap/ui-bootstrap.js',
		'vendor/bower/angular-bootstrap/ui-bootstrap-tpls.js',
		'vendor/bower/ng-breadcrumbs/dist/ng-breadcrumbs.js',
		'vendor/bower/angular-redactor/angular-redactor.js',
		'vendor/bower/angular-notify/angular-notify.js',
		'vendor/bower/switchery/dist/switchery.js',
		'vendor/bower/angular-upload/angular-upload.js',
		'vendor/bower/ng-tags-input/ng-tags-input.js',

        'vendor/bower/angular-mocks/angular-mocks.js',

        'src/**/*.js',
        'dist/js/templates/**/*.js',
        'test/unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
