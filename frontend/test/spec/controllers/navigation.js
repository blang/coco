'use strict';

describe('Controller: NavigationCtrl', function () {

  // load the controller's module
  beforeEach(module('commanderyeoApp'));

  var NavigationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavigationCtrl = $controller('NavigationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of navigation items to the scope', function () {
    expect(scope.navList.length).toBeGreaterThan(2);
  });
});
