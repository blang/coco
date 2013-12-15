'use strict';

angular.module('cocoApp')
  .controller('EventCtrl', ['$scope','$routeParams','EventsFactory', function ($scope, $routeParams, EventsFactory) {
    if(!$routeParams.id){
      console.log('Wrong route param');
    }
    EventsFactory.getEventById($routeParams.id).success(function(data){
      $scope.event = data;
    });
  }]);
