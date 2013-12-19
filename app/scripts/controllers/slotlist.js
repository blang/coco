'use strict';

angular.module('cocoApp')
  .controller('SlotlistCtrl', ['$scope', 'SlotsFactory', function ($scope, SlotsFactory) {
    $scope.slots = SlotsFactory.getSlotsByEventId($scope.eventid);
  }]);
