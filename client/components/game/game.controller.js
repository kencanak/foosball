'use strict';

angular.module('foosballApp')
  .controller('GameCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers, gameRecord) {
    $scope.players = angular.copy(gamePlayers);
    $scope.playersMobile1 = angular.copy(gamePlayers);
    $scope.playersMobile2 = angular.copy(gamePlayers);
    $scope.gameRecord = gameRecord;
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
        $scope.gameRecord.team1 = [];
        $scope.gameRecord.team2 = [];
        $scope.gameRecord.team1Score = 0;
        $scope.gameRecord.team2Score = 0;
      }
    });

    $scope.teamMobileSettings = {
      smartButtonMaxItems: 2,
      selectionLimit: 2,
      showCheckAll: false,
      showUncheckAll: false,
      scrollableHeight: 150,
      enableSearch: true,
      idProp: 'name',
      displayProp: 'name',
      scrollable: true,
      externalIdProp: 'name'
    };

    $scope.dropdownCustomText = {
      buttonDefaultText: 'Select player(s)'
    }

    $scope.optionsTeam1 = {
      accept: function(dragEl) {
        if ($scope.gameRecord.team1.length >= 2) {
          return false;
        } else {
          return true;
        }
      }
    };

    function removeSelectedPlayers(){
      $scope.players = angular.copy(gamePlayers);
      $scope.playersMobile1 = angular.copy(gamePlayers);
      $scope.playersMobile2 = angular.copy(gamePlayers);
      var selectedPlayers = $scope.gameRecord.team1.concat($scope.gameRecord.team1);

      angular.forEach(selectedPlayers, function(value, key){
        $scope.players = $scope.players.filter(function(item){
          return item.name !== value.name;
        });

      })

      //for mobile team 1, to exclude those players in team 2
      angular.forEach($scope.gameRecord.team2, function(value, key){
        $scope.playersMobile1 = $scope.playersMobile1.filter(function(item){
          return item.name !== value.name;
        });
      })
      //for mobile team 2, to exclude those players in team 1
      angular.forEach($scope.gameRecord.team1, function(value, key){
        $scope.playersMobile2 = $scope.playersMobile2.filter(function(item){
          return item.name !== value.name;
        });
      })

    }

    $scope.$watch('gameRecord.team1.length', function(newValue, oldValue){
      removeSelectedPlayers();
    });

    $scope.$watch('gameRecord.team2.length', function(newValue, oldValue){
      removeSelectedPlayers();
    });

    $scope.deletePlayer = function(player, team){
      $scope.players.push(player);

      $scope.gameRecord[team] = $scope.gameRecord[team].filter(function(item){
        return item.name !== player.name;
      });
    };

    $scope.optionsTeam2 = {
      accept: function(dragEl) {
        if ($scope.gameRecord.team2.length >= 2) {
          return false;
        } else {
          return true;
        }
      }
    };

    $scope.saveGame = function(){
      $scope.gameRecord['team1'] = $scope.gameRecord['team1'].filter(function(item){
        return item.name !== '';
      });
      $scope.gameRecord['team2'] = $scope.gameRecord['team2'].filter(function(item){
        return item.name !== '';
      });
      if ($scope.gameRecord.team1.length === 0 || $scope.gameRecord.team2.length === 0)
      {
        $scope.errors = "Please select your team's player(s)";
        return false;
      }
      if ($scope.gameRecord.team1.length !== $scope.gameRecord.team2.length)
      {
        $scope.errors = "Number of players between 2 teams must be the same";
        return false;
      }

      var team1 = [];
      var team2 = [];

      angular.forEach($scope.gameRecord.team1, function(value, key) {
        team1.push(value.name);
      });

      angular.forEach($scope.gameRecord.team2, function(value, key) {
        team2.push(value.name);
      });

      var gameData = new Game({
        team1: team1,
        team2: team2,
        team1_score: $scope.gameRecord.team1Score,
        team2_score: $scope.gameRecord.team2Score
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



  }).directive('gamecreator', function(){
    return{
      templateUrl: 'components/game/game.html',
      restrict: 'E',
      scope: {
        'formtype': '@'
      },
      transclude: true
    }
  });
