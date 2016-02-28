'use strict';

angular.module('foosballApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.reguser = {};
    $scope.regerrors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          fname: $scope.reguser.fname,
          lname: $scope.reguser.lname,
          email: $scope.reguser.email,
          password: $scope.reguser.password
        })
          .then( function() {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            err = err.data;
            $scope.regerrors = {};

            // Update validity of form fields that match the mongoose regerrors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.regerrors[field] = error.message;
            });
          });
      }
    };

  });
