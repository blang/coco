'use strict';
var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  $q = require('q');
module.exports = function () {
  var deferred = $q.defer();

  var event = new Event({
    title: 'Op Praying Mantis',
    type: 'Coop',
    image: '',
    desc: 'Die USMC Truppen haben den Auftrag die Kuestenbereiche zu ueberfallen, bevor die Russen verdacht schoepfen',
    server: '127.0.0.1:2302',
    modstring: '@ace;@acre;@fallujah;@cba',
    island: 'Fallujah',
    creator: 'Coati',
    organizer: 'Rickyfox',
    playerMin: 5,
    playerMax: 24,
    setupMedic: 'Endheilung nur Medics',
    setupRespawn: 'Truppennachfuehrung ueber E12 Tools',
    setupLoadout: 'M4 Modelle',
    text: 'Placeholder for markdown'
  });

  event.save(function (err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise;
};