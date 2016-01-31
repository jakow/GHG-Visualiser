'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller("MapCtrl", [ '$scope', '$http', 'olData', 'olHelpers', function($scope, $http, olData, olHelpers) {

    angular.extend($scope, {
      center: {
        lat: 54,
        lon: 0,
        zoom: 5
      },
      defaults: {
        events: {
          map: ['click']
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
            color: 'rgba(0, 0, 255, 0.2)'
          },
          stroke: {
            color: 'rgba(0, 0, 255, 1)',
            width: 1
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
            // evil hack
            style: JSON.parse(JSON.stringify(defaultStationStyle))
          }
        );
      });

      $scope.stations_markers = stations_markers;
    });

    $scope.$on('openlayers.map.click', function (event, data) {
      var station = data.event.map.forEachFeatureAtPixel(data.event.pixel, function(feature, layer) {
        return feature;
      });
      if(station) {
        $scope.$apply(function(scope) {
          $scope.stations_markers[station.getId() - 1].style.image.circle.fill.color = 'rgba(255, 0, 0, 0.4)';
          $scope.stations_markers[station.getId() - 1].style.image.circle.stroke.color = 'rgba(255, 0, 0, 1)';
        });
      }
    });
  }]);
