module.exports = function(grunt) {
    var configs = '_js/globals/configs/production.js',
        i = 0,
        len = grunt.cli.tasks.length;

    //SET GLOBAL CONFIGS BASED ON ENVIROMENT OR TASK
    for (i; i < len; i++) {
        if (grunt.cli.tasks[i] === 'dev') {
            configs = '_js/globals/configs/development.js';
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: '_scss/globals/'
                },
                files: {
                    'e2/css/rv7/publicaffairs/style.css': '_scss/style.scss'
                }
            }
        },
        browserify: {
            libs: {
                files: {
                    '_js/bundled/header.js': '_js/globals/header.js'
                },
                options: {
                    transform: ['babelify']
                }
            },
            bio: {
                files: {
                    '_js/bundled/publicaffairs.js': [configs, '_js/publicaffairs.js']
                },
                options: {
                    transform: ['babelify']
                }
            }
        },
        'sftp-deploy': {
            build: {
                auth: {
                    host: 'frontend.ardev.us',
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: '_site/',
                dest: '/www/development/<%= pkg.name %>',
                exclusions: ['_site/e2'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            },
            e2CSSbuild: {
                auth: {
                    host: 'frontend.ardev.us',
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: '_site/e2/css/rv7/<%= pkg.name %>',
                dest: '/www/development/e2/css/rv7/<%= pkg.name %>',
                serverSep: '/',
                concurrency: 4,
                progress: true
            },
            e2JSbuild: {
                auth: {
                    host: 'frontend.ardev.us',
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: '_site/e2/js/rv7/<%= pkg.name %>',
                dest: '/www/development/e2/js/rv7/<%= pkg.name %>',
                serverSep: '/',
                concurrency: 4,
                progress: true
            }
        },
        watch: {
            scripts: {
                files: ['_js/*.js', '_scss/*.scss'],
                tasks: ['browserify', 'uglify', 'sass'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true,
                compress: true,
                beautify: false
            },
            build: {
                files: [{
                    src: [
                        '_js/bundled/header.js',
                        '_js/bundled/publicaffairs.js'
                    ],
                    dest: 'e2/js/rv7/<%= pkg.name %>/main.min.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');

    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('production', ['sass', 'browserify', 'uglify']);

    grunt.registerTask('dev', ['replace:dev', 'sass', 'browserify', 'uglify']);

    grunt.registerTask('cdn', ['replace:cdn', 'sass', 'browserify', 'uglify']);

};
