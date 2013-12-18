'use strict';
var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');
module.exports = function (environment) {
  /*jshint camelcase: false */
  var env = environment || 'development';
  var dboptions = {
    server: {
      poolSize: 5
    }
  };
  var config = {
    development: {
      root: rootPath,
      app: {
        name: 'backend'
      },
      port: 3000,
      db: 'mongodb://localhost/backend-development',
      dboptions: dboptions
    },

    test: {
      root: rootPath,
      app: {
        name: 'backend'
      },
      port: 3000,
      db: 'mongodb://localhost/backend-test',
      dboptions: dboptions
    },

    production: {
      root: rootPath,
      app: {
        name: 'backend'
      },
      port: 3000,
      db: 'mongodb://localhost/backend-production',
      dboptions: dboptions
    }
  };
  return config[env];
};
