module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            rt: {
                command: 'rt *.rt',
                options: {
                    execOptions: {
                        cwd: 'js/comps'
                    }
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['js/**/*.rt.js'],
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    grunt.registerTask('default', ['shell:rt', 'jshint', 'watch']);
};