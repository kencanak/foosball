'use strict';

angular.module('foosballApp')
  .controller('AccountCtrl', function ($scope, Auth, $location, isMobileRegistration) {
    $scope.isMobileRegistration = isMobileRegistration;
  });
