'use strict';

angular.module('cocoAppDev', ['cocoApp', 'ngMockE2E'])
  .run(['$httpBackend', function($httpBackend) {

    // templates need to pass through
    $httpBackend.whenGET(/^\/views\//).passThrough();
    $httpBackend.whenGET(/^views\//).passThrough();
  }]);
