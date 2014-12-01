module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    cleanBowerDir: true
                }
            }
        },
        shell: {
            rt: {
                command: 'node node_modules/react-templates/src/cli.js js/comps/*.rt'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        watch: {
            templates: {
                files: ['**/*.rt'],
                tasks: ['shell:rt'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false
                }
            },
            npm: {
                files: ['package.json'],
                tasks: ['npm-install']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bower:install']
            }
        }
    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('default', ['shell:rt', 'jshint']);

    grunt.registerTask('all', ['npm-install', 'bower:install', 'default']);
};