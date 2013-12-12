'use strict';

angular.module('cocoApp')
  .directive('participation', [function () {
    return {
      restrict: 'E',
      controller: 'ParticipationCtrl',
      scope: {
        eventid: '='
      },
      templateUrl: 'views/participation.html'
    };
  }]);
