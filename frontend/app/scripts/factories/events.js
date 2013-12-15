'use strict';

angular.module('cocoApp')
  .factory('EventsFactory', ['$http', function ($http) {

    var factory = {
      getEvents: function(){
        console.log('getEvents');
        return $http({method: 'GET', url: '/api/events'});
      },
      getEventById : function(id){
        return $http({method: 'GET', url: '/api/events/'+id});
      }

    };
    return factory;
  }]);

