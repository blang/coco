'use strict';

angular.module('cocoApp')
  .factory('ParticipationFactory', [ '$q', function ($q) {
    console.log('init');
    var store = [
      {
        eventid: 1,
        state: 1,
        selection: {
          '1':1,
          '2':2
        }
      }
    ];
    var factory = {
      getParticipationByEventId : function(eventid){
        var deferred = $q.defer();
        for(var i = 0; i<store.length;i++){
          if(store[i].eventid===eventid){
            break;
          }
        }
        deferred.resolve(store[i]);
        return deferred.promise;
      }
    };
    return factory;
  }]);

