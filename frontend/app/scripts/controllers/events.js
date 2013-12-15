'use strict';

angular.module('cocoApp')
  .controller('EventsCtrl', ['$scope','EventsFactory', function ($scope, EventsFactory) {
    EventsFactory.getEvents().success(function(data){
      $scope.events = data;
    });
  }]);
