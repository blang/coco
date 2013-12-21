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

exports.get = function (req, res, next) {
	if (req.params && req.params.id) {
		Event.findOne({_id: req.params.id}, function (err, event) {
			if (err) {
				res.status(404).send({});
			} else {
				if (event) {
					res.json(event);
				} else {
					res.status(404).send({});
				}
			}
		});
	} else {
		next(new Error('No eventid given'));
	}
};
