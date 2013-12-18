'use strict';
var express = require('express'),
  mongoose = require('mongoose'),
  $q = require('q');

var config = require('./config/config')(process.env.NODE_ENV);

mongoose.connect(config.db, config.dbconfig);
var dbready = $q.defer();
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

db.once('open', function () {
  dbready.resolve();
});

var app = express();
app.set('dbready', dbready.promise);
require('./config/models')(config);
require('./config/express')(app, config);
require('./config/routes')(app);

if (!module.parent) {
  app.listen(config.port);
} else {
  module.exports = app;
}