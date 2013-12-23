'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  $q = require('q');
module.exports = function () {
  var deferred = $q.defer();

  var user = new User({
    username: 'user',
    password: 'user'
  });

  user.save(function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise;
};