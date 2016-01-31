'use strict';

/**
 * @ngdoc service
 * @name frontendApp.locationData
 * @description
 * # locationData
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .factory('locationData', function (Stations) {
    var locData = {};
    locData.location = {};

    locData.getLocationData = function(stationName) {
      console.log(stationName);
      return Stations.one(stationName).get().then(function(data) {
        locData.location = data;
      });
    };


    return locData;
  });
