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

        critical: {
            index: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/publicaffairs/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/index.html',
                dest: './_site/index.html'
            },
            sgm: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/publicaffairs/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/sgm/index.html',
                dest: './_site/sgm/index.html'
            },
            principaldeputy: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/publicaffairs/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/principaldeputy/index.html',
                dest: './_site/principaldeputy/index.html'
            },
            deputy: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/publicaffairs/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/deputy/index.html',
                dest: './_site/deputy/index.html'
            },
            chief: {
                options: {
                    inline: true,
                    minify: true,
                    base: './',
                    css: [
                        '_site/e2/css/rv7/publicaffairs/style.css'
                    ],
                    dimensions: [{
                        height: 768,
                        width: 1366
                    }, {
                        height: 640,
                        width: 360
                    }, {
                        height: 568,
                        width: 320
                    }]
                },
                src: './_site/chief/index.html',
                dest: './_site/chief/index.html'
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
        },
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n'
                },
                files: {
                    src: ['_site/e2/js/**/*.js', '_site/e2/css/**/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-critical');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('production', ['browserify', 'uglify']);

    grunt.registerTask('post-production', ['usebanner', 'critical']);

};
