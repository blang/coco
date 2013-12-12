'use strict';

angular.module('cocoApp')
  .controller('ParticipationCtrl', ['$scope','ParticipationFactory','SlotsFactory', function ($scope, ParticipationFactory, SlotsFactory) {
    ParticipationFactory.getParticipationByEventId($scope.eventid).then(function(data){
      $scope.participation = data;
    });
    $scope.slots = SlotsFactory.getSlotsByEventId($scope.eventid);
    $scope.setSelection = function(slotid, value){
      $scope.participation.selection[slotid]=value;
    };
    $scope.save = function(){
      console.err('not implemented');
    };
  }]);
