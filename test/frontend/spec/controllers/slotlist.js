'use strict';

describe('Controller: SlotlistCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
    scope;
  var mockSlotlist = [
    {id: 1, role: 'Squadlead', description: 'Desc'},
    {id: 2, role: 'MGGunner', description: 'Desc2'}
  ];
  var mockSlotsFactory = {
    'getSlotsByEventId' : function (id) {
      if (id === 1) {
        return mockSlotlist;
      } else {
        console.err('Id was not 1', id);
      }
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $routeParams, $rootScope) {
    scope = $rootScope.$new();
    scope.eventid = 1;
    ctrl = $controller('SlotlistCtrl', {
      $scope: scope,
      SlotsFactory: mockSlotsFactory
    });
  }));

  it('should attach the slotlist to the scope', function () {
    expect(scope.slots).toEqual(mockSlotlist);
  });
});
