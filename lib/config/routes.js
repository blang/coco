'use strict';
module.exports = function (app, config) {

	//home route
	var home = require(config.root + '/lib/controllers/home');
	app.get('/home', home.index);

  var events = require(config.root + '/lib/controllers/events');
  app.get('/api/events', events.index);
  app.get('/api/events/:id', events.get);

  //index and partials route
  var index = require(config.root + '/lib/controllers/index');
  app.get('/partials/*', index.partials);
  app.get('/', index.index);
  app.get('/index.html', index.index);
};
