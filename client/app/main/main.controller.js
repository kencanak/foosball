'use strict';

angular.module('foosballApp')
  .controller('MainCtrl', function ($scope, $http, Auth, User, showGameForm, gameRecord) {
    $scope.mobileRankingsOpen = true;
    $scope.showGameForm = showGameForm;
    $scope.team1 = gameRecord;
  });
