'use strict';

var mongoose = require('mongoose'),
  Event = mongoose.model('Event');

exports.index = function (req, res, next) {
  Event.find(function (err, events) {
    if (err) {
      next(new Error(err));
    }
    res.json(events);
  });
};
