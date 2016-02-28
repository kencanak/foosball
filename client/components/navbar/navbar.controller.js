'use strict';

angular.module('foosballApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, showGameForm) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.showGameForm = showGameForm;
    $scope.showGameForm.added = false;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/account');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
