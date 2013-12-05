'use strict';

angular.module('cocoApp')
  .factory('EventsFactory', ['$http', function ($http) {
    console.log('EventFactory init');
    var mockEvents = [
      {id: 1, title: 'co[21] Hello World', description:'Worlds first Event'},
      {id: 2, title: 'co[31] Good Bye', description:'Worlds second Event'},
      {id: 3, title: 'co[44] Have a nice day', description:'Worlds second Event'},
      {id: 4, title: 'co[12] Praying Mantis', description:'Worlds second Event'},
    ];
    var factory = {
      getEvents: function(){
        return mockEvents;
      }

    };

    return factory;
  }]);

