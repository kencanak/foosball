'use strict';

angular.module('foosballApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, showGameForm, isMobileRegistration) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isMobileRegistration = isMobileRegistration;

    $scope.showGameForm = showGameForm;
    $scope.showGameForm.added = false;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    var gameForm = "#game-wrapper";

    $scope.logout = function() {
      $scope.isMobileRegistration.isMobileRegistration = false;
      Auth.logout();
      $location.path('/account');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
