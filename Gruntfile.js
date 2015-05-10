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
          }, {
            pattern: /@SETTINGSCSSREV@/g,
            replacement: function () {
              var cssrev = grunt.file.read('dist/settingsCSSrev').trim();
              grunt.file.delete('dist/settingsCSSrev');
              return cssrev;
            }
          }, {
            pattern: /@RAWGITREPO@/g,
            replacement: 'https://cdn.rawgit.com/Zod-/InstaSynchP-Core'
          }, ]
        }
      }
    },
    copy: {
      dist: {
        flatten: true,
        expand: true,
        src: ['src/settings.css'],
        dest: 'dist/',
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
    shell: {
      gitlog: {
        command: 'git log -n 1 --pretty="%H" dist/settings.css',
        options: {
          callback: function log(err, stdout, stderr, cb) {
            grunt.file.write('dist/settingsCSSrev', stdout);
            cb();
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-userscript-meta');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build-css', ['copy']);
  grunt.registerTask('build-js', ['shell', 'userscript-meta', 'concat',
    'string-replace'
  ]);
  grunt.registerTask('build', ['build-css', 'build-js']);
  grunt.registerTask('default', ['build', 'test']);
};
