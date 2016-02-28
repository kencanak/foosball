'use strict';

angular.module('foosballApp')
  .controller('FooterCtrl', function ($scope, $location, Auth) {

    $scope.currentDate = new Date();
  });
