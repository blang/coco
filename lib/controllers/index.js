'use strict';

var path = require('path');

module.exports.partials = function (req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function (err, html) {
    if (err) {
      res.status(404).render('404', { title: '404' });
    } else {
      res.send(html);
    }
  });
};

module.exports.index = function (req, res) {
  res.render('index');
};
