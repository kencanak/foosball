'use strict';

angular.module('foosballApp')
  .controller('gameHistoryCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers) {
    $scope.players = angular.copy(gamePlayers);

    $scope.showGameForm = showGameForm;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.doneCalc = false;


    sortGames();

    $scope.$watch('showGameForm.added', function(newValue, oldValue){
      if (newValue === true) {
        sortGames();
      }
    });

    $scope.getLength = function(obj) {
      return Object.keys(obj).length;
    }

    function sortGames(){
      Game.history().$promise.then(function(data) {
        angular.each(data, function(value, key){

        });
      });

    }

  });
