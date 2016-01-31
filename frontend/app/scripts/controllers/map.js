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

    var apiPath = 'http://demo9799735.mockable.io/';

    var defaultStationStyle = {
      image: {
        circle: {
          radius: 8,
            fill: {
            color: 'rgba(0, 0, 255, 0.6)'
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

    angular.extend($scope, {
      center: {
        lat: 45,
        lon: -75.09,
        zoom: 1
      },
      kml: {
        name: 'states',
        source: {
          type: 'KML',
          projection: 'EPSG:3857',
          url: 'states.kml'
        }
      },
      defaults: {
        events: {
          layers: ['mousemove', 'click']
        }
      }
    });

    $scope.$on('openlayers.layers.states.click', function (event, feature) {
      feature.setStyle(olHelpers.createStyle({
        fill: {
          color: 'rgba(0, 255, 0, 0.2)'
        }
      }));
    });
  }]);
