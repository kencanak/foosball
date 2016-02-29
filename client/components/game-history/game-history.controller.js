'use strict';

angular.module('foosballApp')
  .controller('gameHistoryCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers, $moment,$animate) {
    $scope.players = angular.copy(gamePlayers);

    $scope.showGameForm = showGameForm;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.doneCalc = false;
    $scope.gameHistory = {}


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
      $scope.gameHistory = {}
      Game.history().$promise.then(function(data) {
        angular.forEach(data, function(value, key){

          if (!(moment(value.created).format('MMMM YYYY') in $scope.gameHistory)) {
            $scope.gameHistory[moment(value.created).format('MMMM YYYY')] = {}

          }

          if (!(moment(value.created).format('dddd DD') in $scope.gameHistory[moment(value.created).format('MMMM YYYY')])) {
            $scope.gameHistory[moment(value.created).format('MMMM YYYY')][moment(value.created).format('dddd DD')] = []
          }

          $scope.gameHistory[moment(value.created).format('MMMM YYYY')][moment(value.created).format('dddd DD')].push(value);
        });
        $scope.doneCalc = true;
      });

    }

  });
