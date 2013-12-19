'use strict';

angular.module('cocoApp')
  .factory('SlotsFactory', [ function () {
    var mockSlotlist = [
      {id: 1, role: 'Squadlead', ident: '#1', description: 'Fuehrung'},
      {id: 2, role: 'Fireteamlead', player: {username: 'Coati'}, ident: '#2'},
      {id: 3, role: 'Grenadier', ident: '#3'},
      {id: 4, role: 'MG Gunner', ident: '#4'}
    ];
    var factory = {
      getSlotsByEventId: function () {
        return mockSlotlist;
      }
    };
    return factory;
  }]);
