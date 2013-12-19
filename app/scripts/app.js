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
        templateUrl: '/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/route2', {
        name: 'route2',
        templateUrl: '/partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/events', {
        name: 'events',
        templateUrl: 'partials/events.html',
        controller: 'EventsCtrl'
      })
      .when('/event/:id', {
        name: 'event',
        templateUrl: 'partials/event.html',
        controller: 'EventCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
