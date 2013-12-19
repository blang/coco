'use strict';
var express = require('express'),
  mongoose = require('mongoose'),
  $q = require('q');

var config = require('./lib/config/config')(process.env.NODE_ENV);
console.log('DB Connection to ' + config.db);
var dbready = $q.defer();
mongoose.connect(config.db, config.dbconfig);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
db.once('open', function () {
  dbready.resolve();
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
process.on('uncaughtException',function(e) {
  console.log("Caught unhandled exception: " + e);
  console.log(" ---> : " + e.stack);
});
var app = express();
app.set('dbready', dbready.promise);
require('./lib/config/models')(config);
require('./lib/config/express')(app, config);
require('./lib/config/routes')(app, config);

if (!module.parent) {
  app.listen(config.port);
} else {
  module.exports = app;
}