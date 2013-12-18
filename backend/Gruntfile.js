'use strict';

var request = require('request');

module.exports = function (grunt) {
  /*jshint camelcase: false */

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35730, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    jasmine_node: {
      options: {
        specNameMatcher: 'spec', // load only specs containing specNameMatcher
        projectRoot: '.',
        requirejs: false,
        forceExit: false,
        isVerbose: true
      },
      all: ['test/']
    },
    env : {
      options : {},
      dev : {
        NODE_ENV : 'development'
      },
      production : {
        NODE_ENV : 'production'
      },
      test : {
        NODE_ENV : 'test'
      },
    },
    watch: {
      // options: {
      //   livereload: reloadPort
      // },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['newer:jshint:all', 'develop', 'delayed-livereload'],
        options: {
          nospawn: true,
          livereload: reloadPort
        }
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: {
          nospawn: true,
          livereload: reloadPort
        }
      },
      test: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js',
          'test/**/*.js'
        ],
        tasks: ['newer:jshint:all', 'jasmine_node']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/{,*/}*.js',
        'app.js',
        'config/**.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('preparedb', 'Drops the env-specific db and imports fixtures.', function () {
    var done = this.async();
    var pdb = require('./prepare-db');
    var errorHandler = function (err) {
      grunt.log.error('An error occurred.', err);
      done(err);
    };
    pdb.initStandalone().then(function () {
      pdb.preparedb().then(function () {
        grunt.log.writeln('Successfully imported');
        done();
      }, errorHandler);
    }, errorHandler);
  });

  grunt.registerTask('default', ['jshint:all', 'develop', 'watch:js']);
  grunt.registerTask('test', ['jshint:test', 'env:test', 'jasmine_node']);
  grunt.registerTask('test:continuous', ['test', 'watch:test']);
  grunt.registerTask('check', ['jshint', 'env:test', 'jasmine_node']);
};
