'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp', ["openlayers-directive"])
  .controller("MapCtrl", [ '$scope', '$http', 'olData', 'olHelpers', function($scope, $http, olData, olHelpers) {

    angular.extend($scope, {
      center: {
        lat: 45,
        lon: -75.09,
        zoom: 1
      },
      defaults: {
        events: {
          map: [ 'click' ]
        }
      },
      stations_data: {},
      stations_markers: {}
    });

    var apiPath = 'http://demo9799735.mockable.io/';

    var defaultStationStyle = {
      image: {
        circle: {
          radius: 8,
            fill: {
            color: 'rgba(0, 0, 255, 1)'
          },
          stroke: {
            color: 'white',
              width: 3
          }
        }
      }
    };

    $http({
      method: 'GET',
      url: apiPath + 'stations/'
    }).then(function successCallback(response) {
      $scope.stations_data = response.data;

      var stations_markers = [];

      $scope.stations_data.forEach(function(station){
        stations_markers.push(
          {
            source: {
              type: 'GeoJSON',
              projection: 'EPSG:3857',
              url: apiPath + 'stations/' + station.id + '/'
            },
            style: defaultStationStyle
          }
        );
      });

      $scope.stations_markers = stations_markers;
    });

    $scope.$on('openlayers.map.click', function (event, data) {
      data.event.map.forEachFeatureAtPixel(data.event.pixel, function(feature, layer) {
        console.log(feature);
      });
    });
  }]);
