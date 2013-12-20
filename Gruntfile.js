'use strict';

module.exports = function (grunt) {
  /*jshint camelcase: false */

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    appsettings: {
      // configurable paths
      app: 'app',
      backend: 'lib',
      dist: 'public',
      views: 'views'
    },
    env : {
      test : {
        NODE_ENV : 'test'
      },
      production : {
        NODE_ENV : 'production'
      }
    },
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      js: {
        files: ['{.tmp,<%= appsettings.app %>}/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:frontend']
      },
      jsTest: {
        files: ['test/frontend/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= appsettings.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        files: [
          '<%= appsettings.app %>/<%= appsettings.views %>/{,*//*}*.{html,jade}',
          '{.tmp,<%= appsettings.app %>}/styles/{,*//*}*.css',
          '{.tmp,<%= appsettings.app %>}/scripts/{,*//*}*.js',
          '<%= appsettings.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/{,*//*}*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      styles: {
        files: ['<%= appsettings.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: ['Gruntfile.js'],
      frontend: {
        options: {
          jshintrc: '<%= appsettings.app %>/.jshintrc'
        },
        src: ['<%= appsettings.app %>/scripts/{,*/}*.js']
      },
      testfe: {
        options: {
          jshintrc: 'test/frontend/.jshintrc'
        },
        src: ['test/frontend/spec/{,*/}*.js']
      },
      backend: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= appsettings.backend %>/{,*/}*.js']
      },
      testbe: {
        options: {
          jshintrc: 'test/backend/.jshintrc'
        },
        src: ['test/backend/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appsettings.views %>/*',
            '<%= appsettings.dist %>/*',
            '!<%= appsettings.dist %>/.git*'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          src: [
            'heroku/*',
            '!heroku/.git*',
            '!heroku/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= appsettings.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= appsettings.app %>/images',
        javascriptsDir: '<%= appsettings.app %>/scripts',
        fontsDir: '<%= appsettings.app %>/styles/fonts',
        importPath: '<%= appsettings.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= appsettings.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= appsettings.dist %>/scripts/{,*/}*.js',
            '<%= appsettings.dist %>/styles/{,*/}*.css',
            '<%= appsettings.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= appsettings.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= appsettings.app %>/<%= appsettings.views %>/index.html',
             '<%= appsettings.app %>/<%= appsettings.views %>/index.jade'],
      options: {
        dest: '<%= appsettings.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= appsettings.views %>/{,*/}*.html',
             '<%= appsettings.views %>/{,*/}*.jade'],
      css: ['<%= appsettings.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= appsettings.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appsettings.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= appsettings.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appsettings.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= appsettings.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= appsettings.app %>/<%= appsettings.views %>',
          src: ['*.html', 'partials/*.html'],
          dest: '<%= appsettings.views %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= appsettings.views %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appsettings.app %>',
          dest: '<%= appsettings.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= appsettings.app %>/<%= appsettings.views %>',
          dest: '<%= appsettings.views %>',
          src: '**/*.jade',
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= appsettings.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      heroku: {
        files: [{
          expand: true,
          dot: true,
          dest: 'heroku',
          src: [
            '<%= appsettings.dist %>/**',
            '<%= appsettings.views %>/**'
          ]
        }, {
          expand: true,
          dest: 'heroku',
          src: [
            'package.json',
            'server.js',
            'lib/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= appsettings.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      testfe: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    // Test frontend
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      unitci: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    // Test backend
    jasmine_node: {
      options: {
        specNameMatcher: 'spec', // load only specs containing specNameMatcher
        projectRoot: '.',
        requirejs: false,
        forceExit: false,
        isVerbose: true
      },
      all: ['test/backend/']
    }
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });


  grunt.registerTask('test', function (target) {
    switch (target) {
      case 'backend':
        grunt.task.run([
          'env:test',
          'jasmine_node'
        ]);
        break;
      case 'frontend':
        grunt.task.run([
          'clean:server',
          'concurrent:testfe',
          'autoprefixer',
          'karma:unit'
        ]);
        break;
      case 'ci':
        grunt.task.run([
          'jshint',
          'clean:server',
          'concurrent:testfe',
          'autoprefixer',
          'karma:unitci',
          'test:backend',
        ]);
        break;
      default:
        grunt.task.run([
          'jshint',
          'test:frontend',
          'test:backend'
        ]);
        break;
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('preparedb', 'Drops the env-specific db and imports fixtures.', function () {
    var done = this.async();
    var pdb = require('./lib/prepare-db');
    var errorHandler = function (err) {
      grunt.log.error('An error occurred.', err);
      done(err);
    };
    pdb.initStandalone().then(function () {
      pdb.preparedb().then(function (counter) {
        grunt.log.writeln('Successfully imported ' + counter + ' fixture(s)');
        done();
      }, errorHandler);
    }, errorHandler);
  });

  grunt.registerTask('heroku', [
    'build',
    'clean:heroku',
    'copy:heroku'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test:frontend',
    'test:backend',
    'build'
  ]);
};
