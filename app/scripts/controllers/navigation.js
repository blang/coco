'use strict';

angular.module('cocoApp')
  .controller('NavigationCtrl', ['$scope', function ($scope) {
    $scope.navList = [
      { url: 'route1', title: 'Route 1', name: 'route1'},
      { url: 'route2', title: 'Route 2', name: 'route2'},
      { url: 'events', title: 'Events', name: 'events'}
    ];

    function detectRoute(event, current) {
      // catch undefined routes, e.g. wrong redirects
      if (!current.$$route) {
        return;
      }
      angular.forEach($scope.navList, function (item) {
        item.active = (current.$$route.name === item.name) ? true : false;
      });
    }
    $scope.$on('$routeChangeSuccess', detectRoute);
  }]);
