'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.login = function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(403).send({});
  }
  User.findOne({username: req.body.username}, function (err, user) {
    if (err) {
      throw new Error(err);
    }
    if (!user) {
      return res.status(403).send({});
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) {
        throw err;
      }
      if (isMatch) {
        req.session.username = user.username;
        res.json({ success: true });
      } else {
        res.status(403).send({ success: false });
      }
    });
  });
};