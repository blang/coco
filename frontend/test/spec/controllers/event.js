'use strict';

describe('Controller: EventCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
    scope;
  var mockEvent = {id: 1, title: 'Event Title 1', description: 'Event description 1'};
  var mockEventsFactory = {
    'getEventById' : function(){
      return mockEvent;
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $routeParams, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('EventCtrl', {
      $scope: scope,
      $routeParams : {id: 1},
      EventsFactory: mockEventsFactory
    });
  }));

  it('should attach a list of navigation items to the scope', function () {
    expect(scope.event).toEqual(mockEvent);
  });
});
