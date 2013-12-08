'use strict';

angular.module('cocoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        name: 'route1',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/route2', {
        name: 'route2',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/events', {
        name: 'events',
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      })
      .when('/event/:id', {
        name: 'event',
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
