'use strict';
var express = require('express'),
  path = require('path');

module.exports = function (app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.use(express.static(path.normalize(config.root + '/../frontend/app')));
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(function (err, req, res, next) {
      if (!err) {
        return next();
      }
      console.log('error!!!');
      res.send(500, 'Something broke!');
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function (req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
