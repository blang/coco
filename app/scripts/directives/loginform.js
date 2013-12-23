'use strict';

angular.module('cocoApp')
  .directive('loginform', [function () {
    return {
      restrict: 'E',
      controller: 'LoginInterceptCtrl',
      scope: {
        eventid: '='
      },
      templateUrl: 'partials/login.html'
    };
  }]);
