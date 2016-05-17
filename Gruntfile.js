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
                exclusions: ['build/', 'node_module/', 'Gruntfile.js', 'package.json', 'readme.md', '.sass-cache', '.git', '.gitignore', '.gitmodules', '.babelrc'],
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
        replace: {
            cdn: {
                src: ['*.html', '_includes/*.html', '_layouts/*.html', '_js/*.js', '_scss/*.scss'],
                overwrite: true,
                replacements: [{
                    from: 'http://frontend.ardev.us/development/publicaffairs/e2/',
                    to: '/e2/'
                }, {
                    from: 'http://frontend.ardev.us/api/',
                    to: 'https://www.army.mil/api/'
                }]
            },
            dev: {
                src: ['*.html', '_includes/*.html', '_layouts/*.html', '_js/*.js', '_scss/*.scss'],
                overwrite: true,
                replacements: [{
                    from: /\/e2\//g,
                    to: 'http://frontend.ardev.us/development/publicaffairs/e2/'
                }, {
                    from: 'https://www.army.mil/api/',
                    to: 'http://frontend.ardev.us/api/'
                }]
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
