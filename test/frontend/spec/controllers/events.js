'use strict';

describe('Controller: EventsCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
    scope,
    mockFactory;
  var mockEvents = [{id: 1, title: 'Event Title 1', description: 'Event description 1'},
      {id: 2, title: 'Event Title 2', description: 'Event description 2'}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    mockFactory = {
      'getEvents' : function () {
        var def = $q.defer();
        def.resolve(mockEvents);
        return {
          success : function (fn) {
            def.promise.then(function (res) {
              fn(res);
            });
          }
        };
      }
    };
    ctrl = $controller('EventsCtrl', {
      $scope: scope,
      EventsFactory: mockFactory
    });
  }));

  it('should attach a list of navigation items to the scope', function () {
    scope.$apply();
    expect(scope.events).toEqual(mockEvents);
  });
});
