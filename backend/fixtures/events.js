var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  $q = require('q'),
  deferred = $q.defer();
module.exports = deferred.promise;

var event = new Event({
  title: 'Mongodb',
  url: 'mongodb',
  text: 'Text for mongodb'
});

event.save(function(err){
  if(err){
    deferred.reject(err);
  }else{
    deferred.resolve();
  }
});
