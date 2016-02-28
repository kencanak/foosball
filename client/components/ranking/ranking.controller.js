'use strict';

angular.module('foosballApp')
  .controller('RankingCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers) {
    $scope.players = angular.copy(gamePlayers);

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var gamesPlayed = Game.query();

    console.log(gamesPlayed);


  });
