'use strict';

angular.module('foosballApp')
  .controller('GameCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers) {
    $scope.players = angular.copy(gamePlayers);
    $scope.team1 = [];
    $scope.team2 = [];
    $scope.team1Score = 0;
    $scope.team2Score = 0;
    $scope.errors = null;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.showGameForm = showGameForm;

    $scope.$watch('showGameForm.showGameForm', function(newValue, oldValue){
      if (newValue !== oldValue)
      {
        $scope.players = angular.copy(gamePlayers);
        $scope.team1 = [];
        $scope.team2 = [];
        $scope.team1Score = 0;
        $scope.team2Score = 0;
      }
    });

    $scope.optionsTeam1 = {
      accept: function(dragEl) {
        if ($scope.team1.length >= 2) {
          return false;
        } else {
          return true;
        }
      }
    };

    $scope.deletePlayer = function(player, team){
      $scope.players.push(player);

      switch(team)
      {
        case "team1":
          $scope.team1 = $scope.team1.filter(function(item){
            return item.name !== player.name;
          });
          break;
        case "team2":
          $scope.team2 = $scope.team2.filter(function(item){
            return item.name !== player.name;
          });
          break;
      }
    };

    $scope.optionsTeam2 = {
      accept: function(dragEl) {
        if ($scope.team2.length >= 2) {
          return false;
        } else {
          return true;
        }
      }
    };


    $scope.saveGame = function(){
      if ($scope.team1.length === 0 || $scope.team2.length === 0)
      {
        $scope.errors = "Please select your team's player(s)";
        return false;
      }
      if ($scope.team1.length !== $scope.team2.length)
      {
        $scope.errors = "Number of players between 2 teams must be the same";
        return false;
      }

      var team1 = [];
      var team2 = [];

      angular.forEach($scope.team1, function(value, key) {
        team1.push(value.name);
      });

      angular.forEach($scope.team2, function(value, key) {
        team2.push(value.name);
      });

      var gameData = new Game({
        team1: team1,
        team2: team2,
        team1_score: $scope.team1Score,
        team2_score: $scope.team2Score
      })
      gameData.$save(function(response) {
        $scope.errors = null;
        notify({ message:'Game added successfully', position:'center', duration: 3000} );
        $scope.showGameForm.showGameForm = false;
        $scope.showGameForm.added = true;
      }, function(errorResponse) {
        $scope.errors = errorResponse.data.message;
      });
    };



  });
