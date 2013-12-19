'use strict';

describe('Controller: EventCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
    scope,
    mockFactory;
  var mockEvent = {id: 1, title: 'Event Title 1', description: 'Event description 1'};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $routeParams, $rootScope) {
    scope = $rootScope.$new();
    mockFactory = {
      'getEventById' : function () {
        return {
          'success': function (callback) {
            callback(mockEvent);
          }
        };
      }
    };
    ctrl = $controller('EventCtrl', {
      $scope: scope,
      $routeParams : {id: 1},
      EventsFactory: mockFactory
    });
  }));

  it('should attach a list of navigation items to the scope', function () {
    scope.$apply();
    expect(scope.event).toEqual(mockEvent);
  });
});
