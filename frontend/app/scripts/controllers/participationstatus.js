'use strict';

angular.module('cocoApp')
  .controller('ParticipationStatusCtrl', ['$scope','ParticipationFactory', function ($scope, ParticipationFactory) {
    $scope.part = {};
    ParticipationFactory.getParticipationByEventId($scope.eventid).then(function(data){
      $scope.part = data;
    });
    $scope.getLabelState = function(part){
      if(part.state === 1){ //signed out
        return 1;
      }else if(!part.state){ //no state yet
        return 0;
      }else{ //signed in

        if(!part.modstate){ //signed in without further info
          return 2;
        }else if(part.modstate === 1){ //awaiting moderation
          return 3;
        }else if(part.modstate === 2){ //awaiting slot set
          return 4;
        }else if(part.modstate === 3){ //awaiting feedback
          return 5;
        }
      }
    };
  }]);
