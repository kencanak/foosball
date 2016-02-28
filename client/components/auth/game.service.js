'use strict';

angular.module('foosballApp')
  .factory('Game', function ($resource) {
    return $resource('/api/games/:id/:controller', {
      id: '@_id'
    },
    {

      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
