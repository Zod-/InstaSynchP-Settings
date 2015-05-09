module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'string-replace': {
      build: {
        files: {
          'dist/': 'dist/*.js',
        },
        options: {
          replacements: [{
            pattern: /@VERSION@/g,
            replacement: '<%= pkg.version %>'
          }, {
            pattern: /\/\/ @name[^\n]*\n/g,
            replacement: function (match) {
              return match.replace(/-/g, ' ');
            }
          }]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      beforereplace: ['src/settings.js', 'src/settingsfield.js'],
      other: ['Gruntfile.js']
    },
    concat: {
      dist: {
        src: ['tmp/meta.js', 'src/settingsfield.js', 'src/settings.js'],
        dest: 'dist/InstaSynchP-Settings.user.js'
      }
    },
    'userscript-meta': {
      build: {
        dest: 'tmp/meta.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-userscript-meta');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['userscript-meta', 'concat',
    'string-replace'
  ]);
  grunt.registerTask('default', ['build', 'test']);
};
