'use strict';

angular.module('cocoApp')
  .directive('participationstatus', [function () {
    return {
      restrict: 'E',
      controller: 'ParticipationStatusCtrl',
      scope: {
        eventid: '='
      },
      templateUrl: 'views/participationstatus.html'
    };
  }]);
