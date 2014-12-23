module.exports = function(grunt) {

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // Default task.
//    grunt.registerTask('default', ['jshint', 'build', 'karma:unit']);
    grunt.registerTask('default', [/*'jshint',*/ 'build']);
    grunt.registerTask('build', ['clean', 'html2js', 'concat', 'less:build', 'autoprefixer', 'copy:assets']);
    grunt.registerTask('release', ['clean', 'html2js', 'uglify', /*'jshint', 'karma:unit', 'concat:index',*/ 'less:min', 'autoprefixer', 'copy:assets']);
    grunt.registerTask('test-watch', ['karma:watch']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    var karmaConfig = function(configFile, customOptions) {
        var options = {
            configFile: configFile,
            keepalive: true
        };
        var travisOptions = process.env.TRAVIS && {
            browsers: ['Firefox'],
            reporters: 'dots'
        };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' + ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            js: ['src/**/*.js'],
            jsTpl: ['<%= distdir %>/templates/**/*.js'],
            specs: ['test/**/*.spec.js'],
            scenarios: ['test/**/*.scenario.js'],
            html: ['index.html'],
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html']
            },
            less: ['less/main.less'],
            lessWatch: ['less/**/*.less']
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [{
                    dest: '<%= distdir %>',
                    src: '**',
                    expand: true,
                    cwd: 'assets/'
                }]
            }
        },
        karma: {
			unit: {
				configFile: 'test/config/karma.conf.js'
			},
			//continuous integration mode: run tests once in PhantomJS browser.
			continuous: {
				configFile: 'test/config/karma.conf.js',
				singleRun: true,
				browsers: ['PhantomJS']
			},
            watch: {
                options: karmaConfig('test/config/karma.conf.js', {
                    singleRun: false,
                    autoWatch: true
                })
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/js/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/js/templates/common.js',
                module: 'templates.common'
            }
        },
        concat: {
            dist: {
                options: {

                },
                src: ['<%= src.js %>', '<%= src.jsTpl %>'],
                dest: '<%= distdir %>/js/<%= pkg.name %>.js'
            },
            vendor: {
				options: {

				},
                src: [
					'vendor/bower/jquery/dist/jquery.js',
					'vendor/bower/underscore/underscore.js',
					'vendor/redactor/redactor.js',
					'vendor/redactor/lang/ru.js',
					'vendor/redactor/plugins/fullscreen/fullscreen.js',
					'vendor/redactor/plugins/table/table.js',
					'vendor/redactor/plugins/clips/clips.js',
					'vendor/redactor/plugins/placeholders/placeholders.js',
					'vendor/bower/select2/select2.js',

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
                    'vendor/bower/angular-ui-switch/angular-ui-switch.js',
                    'vendor/bower/angular-ui-select2/src/select2.js'
				],
                dest: '<%= distdir %>/js/vendor.js'
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: "<%= banner %>",
                    sourceMap: true,
					mangle: false
                },
                src: ['<%= src.js %>', '<%= src.jsTpl %>'],
                dest: '<%= distdir %>/js/<%= pkg.name %>.js'
            },
			vendor: {
                src: ['<%= concat.vendor.src %>'],
                dest: '<%= distdir %>/js/vendor.js'
            }
        },
        less: {
            build: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.css': ['<%= src.less %>']
                }
            },
            min: {
                options: {
                    cleancss: true,
                    paths: ["assets/css"]
                },
                files: {
                    '<%= distdir %>/css/<%= pkg.name %>.css': ['<%= src.less %>']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: [
					'opera 12',
					'ff 15',
					'chrome 25'
                ]
            },
            release: {
                options: {
                    map: true
                },
                src: '<%= distdir %>/css/<%= pkg.name %>.css'
            }
        },
        watch: {
            all: {
                files: ['<%= src.js %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>'],
                tasks: ['default', 'timestamp']
            },
            build: {
                files: ['<%= src.js %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>'],
                tasks: ['release', 'timestamp']
            }
        },
        jshint: {
            files: ['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        }
    });

};