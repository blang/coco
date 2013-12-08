'use strict';

angular.module('cocoApp')
  .controller('EventCtrl', ['$scope','$routeParams','EventsFactory', function ($scope, $routeParams, EventsFactory) {
    if(!$routeParams.id){
      console.log('Wrong route param');
    }
    $scope.event = EventsFactory.getEventById($routeParams.id);
  }]);
