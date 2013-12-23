'use strict';
angular.module('cocoApp')
  .controller('UserhomeCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get('/api/userhome').success(function (data) {
      $scope.user = data;
    });
  }]);