var mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  $q = require('q');
module.exports = function(){
  var deferred = $q.defer();

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

  return deferred.promise;
};