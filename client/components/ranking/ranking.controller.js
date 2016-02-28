'use strict';

angular.module('foosballApp')
  .controller('RankingCtrl', function ($scope, $location, Auth, Game, showGameForm, notify, gamePlayers) {
    $scope.players = angular.copy(gamePlayers);

    $scope.showGameForm = showGameForm;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.rankings = {};
    $scope.teamRankings = {};
    $scope.doneCalc = false;

    calculateRanking();

    $scope.$watch('showGameForm.added', function(newValue, oldValue){
      if (newValue === true) {
        calculateRanking();
      }
    });

    $scope.getLength = function(obj) {
      return Object.keys(obj).length;
    }

    function calculateRanking(){
      $scope.rankings = {};
      $scope.teamRankings = {};
      $scope.doneCalc = false;
      Game.query().$promise.then(function(data) {
        var rank = {};
        var teamRank = {};
        angular.forEach(data, function(value, key){
          var winner = value[gameWinner(value.team1_score, value.team2_score)];
          var team = [];


          //this is with the assumption each team player's name is unique
          angular.forEach(winner, function(value, key){
            team.push(value);
            var dict = value;//.toLowerCase().replace(' ', '_').replace('.','')

            if (!(dict in rank)) {
              rank[dict] = {'player': value}
              rank[dict]['scores'] = 5;
            }
            else
              rank[dict]['scores'] = rank[dict]['scores'] + 5;
          });

          if (team.length > 1)
          {
            team.sort();

            var teamDict = team.join('_');

            if (!(teamDict in teamRank)) {
              teamRank[teamDict] = {'players': team}
              teamRank[teamDict]['scores'] = 5;
            }
            else
              teamRank[teamDict]['scores'] = teamRank[teamDict]['scores'] + 5;
          }
        });
        $scope.rankings = sortobjkey(rank, "scores");
        $scope.teamRankings = sortobjkey(teamRank, "scores");
        $scope.doneCalc = true;
        $scope.showGameForm.added = false;
      });
    }

    function sortobjkey(obj,key)
    {
      var keys=Object.keys(obj);
      var kva= keys.map(function(k,i)
      {
        return [k,obj[k]];
      });
      kva.sort(function(a,b){
        var k=key;      if(a[1][k]>b[1][k]) return -1;if(a[1][k]<b[1][k]) return 1;
        return 0
      });
      var o={}
      kva.forEach(function(a){ o[a[0]]=a[1]})
      return o;
    }

    function gameWinner(team1_score, team2_score)
    {
      if (team1_score > team2_score)
        return "team1";
      else
        return "team2";
    }


  });
