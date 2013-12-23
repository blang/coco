'use strict';
angular.module('cocoApp')
  .controller('LoginCtrl', ['$scope', '$routeParams', '$http', 'authService', '$location', function ($scope, $routeParams, $http, authService, $location) {
    $scope.submit = function () {
      $http.post('/api/login', {username: $scope.username, password: $scope.password}).success(function () {
        authService.loginConfirmed();
        $location.path('/');
      });
    };
    $scope.cancel = function () {
      authService.loginCancelled();
    };
  }]);