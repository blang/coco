'use strict';
angular.module('cocoApp')
.directive('authwrapper', ['$location', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, elem) {
      var login = elem.find('#loginform');
      var main = elem.find('#content');
      login.hide();
      login.removeClass('hide');

      scope.$on('event:auth-loginRequired', function () {
        console.log('event:auth-loginRequired');
        main.hide();
        login.slideDown();
        // login.slideDown('slow', function() {
        //   main.fadeOut();
        // });
      });
      scope.$on('event:auth-loginConfirmed', function () {
        console.log('event:auth-loginConfirmed');
        login.hide();
        main.show();
      });
      scope.$on('event:auth-loginCancelled', function () {
        console.log('Canceled');
        $location.path('/insufficientperms');
        main.fadeIn();
        login.slideUp();
      });
    }
  };
}]);