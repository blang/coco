'use strict';
module.exports = function (app) {

	//home route
	var home = require('../app/controllers/home');
	app.get('/home', home.index);

  var events = require('../app/controllers/events');
  app.get('/events', events.index);

};
