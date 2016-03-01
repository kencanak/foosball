'use strict';

angular.module('foosballApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, isMobileRegistration) {
    $scope.reguser = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    };
    $scope.regerrors = {};

    $scope.isMobileRegistration = isMobileRegistration;

    $scope.register = function(form) {
      $scope.submitted = true;
      var reg = /^[_a-z0-9]+(\.[_a-z0-9]+)*@roomorama.com$/;
      if (!reg.test($scope.reguser.email))
      {
        $scope.regerrors['email'] = "Enter a valid email (e.g. xxx@roomorama.com)";
        return false;
      }
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

  }).directive('signup', function(){
    return{
      templateUrl: 'components/signup/signup.html',
      restrict: 'E',
      scope: {
        'formtype': '@'
      },
      transclude: true
    }
  });
