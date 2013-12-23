'use strict';

angular.module('cocoApp')
  .factory('AuthFactory', ['$http', function ($http) {

    var factory = {
      login: function (username, password) {
        console.log('login');
        return $http({method: 'POST', url: '/api/login', data: {
          'username': username,
          'password': password
        }});
      }
    };
    return factory;
  }]);
