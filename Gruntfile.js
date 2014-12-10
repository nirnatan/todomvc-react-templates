module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    cleanBowerDir: true,
                    install: true,
                    copy: true
                }
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
                tasks: ['rt'],
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
            }
        },
        'reactTemplates': {
            src: ['js/**/*.rt']
        }
    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-installer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react-templates');


    // Default task(s).
    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('default', ['rt', 'jshint']);
    grunt.registerTask('all', ['npm-install', 'bower:install', 'default']);
};