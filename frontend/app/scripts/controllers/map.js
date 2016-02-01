'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller("MapCtrl", function ($scope, $http, olData, olHelpers, API_BASE_URL, locationData) {
    var click = function () {
      console.log('Click!');
    };
    angular.extend($scope, {
      center: {
        lat: 54,
        lon: -5,
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

    /*$scope.markers = [
      {lon: 10, lat: 10, onClick: click},
      {lon: 20, lat: 20, onClick: click},
      {lon: 30, lat: 30, onClick: click}
    ];*/
    $scope.height = 450;

    var defaultStationStyle = {
      image: {
        circle: {
          radius: 12,
          fill: {
            color: 'rgba(31, 165, 255, 0.6)'
          },
          stroke: {
            color: 'rgba(31, 165, 255, 1)',
            width: 2
          }
        }
      }
    };

    $http({
      method: 'GET',
      url: API_BASE_URL + 'stations/'
    }).then(function successCallback(response) {
      $scope.stations_data = response.data;

      var stations_markers = [];

      $scope.stations_data.forEach(function (station) {
        stations_markers.push(
          {
            source: {
              type: 'GeoJSON',
              projection: 'EPSG:3857',
              url: API_BASE_URL + 'stations/' + station.id
            },
            // evil hack
            style: JSON.parse(JSON.stringify(defaultStationStyle))
          }
        );
      });

      $scope.stations_markers = stations_markers;
    });

    $scope.$on('openlayers.map.click', function (event, data) {
     var station = data.event.map.forEachFeatureAtPixel(data.event.pixel, function (feature, layer) {
     return feature;
     });
     if (station) {
     var locationId = locationData.location.id;
     if (_.isEmpty(locationData.location)) {
     //activate if none was activated
     $scope.$apply(function () {
     activate($scope.stations_markers[station.getId() - 1]);
     locationData.location = _.findWhere($scope.stations_data, {id: station.getId()});
     });
     } else if (locationData.location.id == station.getId()) {
     //deselect if already selected
     $scope.$apply(function () {
     deactivate($scope.stations_markers[locationId - 1]);
     locationData.location = {};
     });
     } else {
     //or just select a new one
     $scope.$apply(function () {
     activate($scope.stations_markers[station.getId() - 1]);
     deactivate($scope.stations_markers[locationId - 1]);
     locationData.location = _.findWhere($scope.stations_data, {id: station.getId()});
     });
     }
     }
     });

    function activate(marker) {
      //console.log(marker);
      marker.style.image.circle.fill.color = 'rgba(22, 118, 182, 0.9)';
      marker.style.image.circle.stroke.color = 'rgba(22, 118, 182, 1)';
    }

    function deactivate(marker) {
      //console.log(marker);
      marker.style.image.circle.fill.color = 'rgba(31, 165, 255, 0.6)';
      marker.style.image.circle.stroke.color = 'rgba(31, 165, 255, 1)';
    }

    //$scope.$watch(function() {return locationData.location}, function(newData) {$scope.location = newData});
    //locationData.location = {"hello": "hello from map controller!"};
  });
