'use strict';

angular.module('foosballApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngDragDrop',
  'cgNotify',
  "ngAnimate",
  "angular-momentjs"
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/account');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('gamePlayers', function(){
    return [
      {
        'name': 'James B.',
        'drag': true
      },
      {
        'name': 'Frank S.',
        'drag': true
      },
      {
        'name': 'Eric B.',
        'drag': true
      },
      {
        'name': 'Peter D.',
        'drag': true
      },
      {
        'name': 'Hannah J.',
        'drag': true
      },
      {
        'name': 'John D.',
        'drag': true
      },
      {
        'name': 'Renato C.',
        'drag': true
      },
      {
        'name': 'Sophie S.',
        'drag': true
      },
      {
        'name': 'Sarah A.',
        'drag': true
      },
      {
        'name': 'Apes',
        'drag': true
      }
    ];
  })
  .factory('isMobileRegistration', function(){
    return {isMobileRegistration: false};
  })
  .factory('showGameForm', function () {
    return { showGameForm: false, added: false };
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/account');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .filter('minLength', function(){
    return function(input, len, pad){
      input = input.toString();
      if(input.length >= len) return input;
      else{
        pad = (pad || 0).toString();
        return new Array(1 + len - input.length).join(pad) + input;
      }
    };
  })


  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          //event.preventDefault();
          $location.path('/account');
        }
      });
    });
  });
