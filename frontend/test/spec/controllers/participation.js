'use strict';

describe('Controller: ParticipationCtrl', function () {

  // load the controller's module
  beforeEach(module('cocoApp'));

  var ctrl,
  scope;
  var mockState = {
    eventid: 1,
    state: 1,
    selection: {
      '1':1,
      '2':2
    }
  };
  var mockFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $routeParams, $rootScope, $q) {
    scope = $rootScope.$new();
    scope.eventid = 1;
    mockFactory = {
      'getParticipationByEventId' : function(eventid){
        var deferred = $q.defer();
        if(eventid === 1){
          deferred.resolve(mockState);
        }else{
          deferred.reject({});
        }
        return deferred.promise;
      }
    };
    ctrl = $controller('ParticipationCtrl', {
      $scope: scope,
      ParticipationFactory: mockFactory
    });
  }));

  it('should attach the participation data to the scope', function () {
    scope.$apply(); //resolve promise
    expect(scope.participation).toBe(mockState);
  });
});
