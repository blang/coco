'use strict';
angular.module('cocoApp')
  .controller('LoginInterceptCtrl', ['$scope', '$routeParams', '$http', 'authService', function ($scope, $routeParams, $http, authService) {
    $scope.submit = function () {
      $http.post('/api/login', {username: $scope.username, password: $scope.password}).success(function () {
        authService.loginConfirmed();
      });
    };
    $scope.cancel = function () {
      authService.loginCancelled();
    };
  }]);