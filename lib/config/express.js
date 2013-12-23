'use strict';
var express = require('express'),
  path = require('path');

module.exports = function (app, config) {

  var confDev = function () {
    console.log('Using development profile!');
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  };
  app.configure('development', confDev);
  app.configure('test', confDev);

  app.configure('production', function () {
    console.log('Going production!');
    app.use(express.compress());
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function () {
    app.set('port', config.port);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'babo!', cookie: { maxAge: 60 * 60 * 1000 }}));
    app.use(app.router);
    app.use(function (req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
