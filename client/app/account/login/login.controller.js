'use strict';

angular.module('foosballApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, isMobileRegistration) {
    $scope.user = {
      email: '',
      password:''
    };
    $scope.errors = {};
    $scope.isMobileRegistration = isMobileRegistration;


    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            $scope.errors.other = err.message;
          });
      }
    };

  }).directive('login', function(isMobileRegistration){
      return{
        templateUrl: 'app/account/login/login.html',
        restrict: 'E',
        scope: {
          'formtype': '@'
        },
        transclude: true
      }
  });
