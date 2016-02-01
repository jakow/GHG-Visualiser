'use strict';

/**
 * @ngdoc service
 * @name frontendApp.ghgDataAPI
 * @description
 * # ghgDataAPI
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .factory('Stations', function (Restangular){
     return Restangular.all('stations');
  });

Restangular.one('stations', '1').all('measurements');
