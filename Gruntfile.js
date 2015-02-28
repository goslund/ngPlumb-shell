'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt); 

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'public',
      build: 'build/',
      dist: 'public'
    },
    sync: {
      dist: {
        files: [{
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: '**'
        }]
      }
    },
    cssmin: {
      minify: {
        src: 'public/css/app.css',
        dest: 'build/css/output.css'
      }
    },
    watch: {
      options: {
        livereload: 35729
      },
      express: {
        files: {
          files: [ '**/*.js'],
          tasks : ['express:dev'],
          options: {
            spawn: false
          }
        }
      },
      src: {
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/css/**/*',
          '<%= yeoman.app %>/js/**/*',
          '<%= yeoman.app %>/views/**/*'
        ],
        tasks: ['cssmin']
      }
    },
    connect: {
      proxies: [
        {
          context: '/framework-app',
          host: 'localhost',
          port: 3000,
          https: false,
          changeOrigin: false
        }
      ],
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= yeoman.build %>'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static(require('path').resolve('public'))
            ];
          }
        }
      },
      /*
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
      */
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: '**'
        }]
      },
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/config/karma.conf.js',
        singleRun: true
      }
    },
    bowercopy: {
      options: {
        destPrefix: '<%= yeoman.app %>'
      },
      test: {
        files: {
          'test/lib/angular-mocks': 'angular-mocks',
          'test/lib/angular-scenario': 'angular-scenario'
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      //'copy:dist',
      'configureProxies',
      // 'connect:livereload',
      'express:dev',
      'watch'
    ]);
  });

  
};
