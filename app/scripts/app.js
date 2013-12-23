'use strict';

angular.module('cocoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor'
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
      .when('/insufficientperms', {
        templateUrl: 'partials/insufficientperms.html',
      })
      .when('/login', {
        name: 'login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/userhome', {
        name: 'userhome',
        templateUrl: 'partials/userhome.html',
        controller: 'UserhomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
