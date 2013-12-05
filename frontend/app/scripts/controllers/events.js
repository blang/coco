'use strict';

angular.module('cocoApp')
  .controller('EventsCtrl', ['$scope','EventsFactory', function ($scope, EventsFactory) {
    $scope.events = EventsFactory.getEvents();
  }]);
