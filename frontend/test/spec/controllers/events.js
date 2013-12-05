'use strict';

describe('Controller: EventsCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
    scope;
  var mockEventsFactory = {
    'getEvents' : function(){
      return [
        {id: 1, title: 'Event Title 1', description: 'Event description 1'},
        {id: 2, title: 'Event Title 2', description: 'Event description 2'}
      ];

    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('EventsCtrl', {
      $scope: scope,
      EventsFactory: mockEventsFactory
    });
  }));

  it('should attach a list of navigation items to the scope', function () {
    expect(scope.events.length).toBe(2);
  });
});
