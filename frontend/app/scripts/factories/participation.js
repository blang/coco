'use strict';

angular.module('cocoApp')
  .factory('ParticipationFactory', [ '$q', function ($q) {
    console.log('init');
    var store = [
      {
        eventid: 1,
        state: 3,
        modstate: 3,
        selection: {
          '1':1,
          '2':2
        }
      }
    ];
    var blueprint = {
      eventid: 0,
      state: 0,
      modstate: 1,
      selection: {
      }
    };
    var factory = {
      getParticipationByEventId : function(eventid){
        var deferred = $q.defer();
        var found = null;
        for(var i = 0; i<store.length;i++){
          if(store[i].eventid===eventid){
            found = store[i];
            break;
          }
        }
        if(found){
          deferred.resolve(found);
        }else{
          // no participation yet, insert blueprint
          var copy = angular.copy(blueprint);
          copy.eventid = eventid;
          store.push(copy);
          deferred.resolve(copy);
        }
        return deferred.promise;
      },
      setParticipationByEventId : function(eventid, participation){
        var deferred = $q.defer();
        for(var i = 0; i<store.length;i++){
          if(store[i].eventid===eventid){
            store[i] = participation;
            break;
          }
        }
        deferred.resolve(participation);
        return deferred.promise;
      }
    };
    return factory;
  }]);

