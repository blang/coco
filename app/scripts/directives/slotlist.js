'use strict';

angular.module('cocoApp')
  .directive('slotlist', [function () {
    return {
      restrict: 'E',
      controller: 'SlotlistCtrl',
      scope: {
        eventid: '='
      },
      templateUrl: 'partials/slotlist.html'
    };
  }]);
