'use strict';

angular.module('cocoApp')
  .factory('EventsFactory', [ function () {
    var mockEvents = [
      {
        id: 1,
        title: 'Hello World',
        type: 'co',
        dates: {
          missionStart: '08.12.13 22:00',
          duration: '2,5Std',
          registerEnd: '08.12.13 10:00',
        },
        description:'Worlds first Event',
        creator: 'Coati',
        organizer: 'Rickyfox',
        server: 'ACE#1, h.echo12.de:2302',
        playerMax: 20,
        playerMin: 5,
        setup: {
          medic: 'Alle koennen heilen\nRevivetime 800sek',
          respawn: 'Nachfuehrung ueber E12 Tools',
          weapons: 'M4 Varianten'
        },
        longdesc: 'lorem ipsum...',
        intel:'test',
        objectives:'test',
        images: 'test',
        modstring: 'test',
        island: 'Sahrani'
      },
      {id: 2, title: 'co[31] Good Bye', description:'Worlds second Event'},
      {id: 3, title: 'co[44] Have a nice day', description:'Worlds second Event'},
      {id: 4, title: 'co[12] Praying Mantis', description:'Worlds second Event'},
    ];
    var factory = {
      getEvents: function(){
        return mockEvents;
      },
      getEventById : function(id){
        var result = null;
        angular.forEach(mockEvents, function(value){
          if(value && value.id === parseInt(id)){
            result = value;
          }
        });
        return result;
      }

    };
    return factory;
  }]);

