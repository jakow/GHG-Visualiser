'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('GraphCtrl', function ($scope, $http, Stations, locationData) {
    $scope.options = {
      chart: {
        noData: "Pick a station from the map on the left.",
        type: 'lineWithFocusChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 60
        },
        transitionDuration: 200,
        useInteractiveGuideline: true,
        x: function (d) {
          return Date.parse(d.date);
        },
        y: function (d) {
          return d.value;
        },
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function (d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        x2Axis: {
          tickFormat: function (d) {
            return d3.time.format('%Y')(new Date(d));
          }
        },
        yAxis: {
          axisLabel: 'Compound concentration ppm per cubic metre',
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          },
          rotateYLabel: true
        },
        y2Axis: {
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          }
        }

      }
    };
    $scope.data = [];

    function transformData(series, response) {
      return {
        "key": series,
        "values": response.measurements
      };
    }
    $scope.location = {};

    $scope.$watch(
      function() { return locationData.location},
      function(newLocation) {
        if (!_.isEmpty(newLocation)) {
          console.log(newLocation);
          $scope.location = newLocation;
          newLocation.measurements = "CO2";
          fetchMeasurements(newLocation).then(function(measurements) {
            $scope.data = [measurements];
          })
        }
        else {
          $scope.data = [];
          $scope.api.clearElement();
        }
        console.log($scope.data);
      }
    );

    $scope.getdata = function() {
      locationData.getLocationData("1");
    };
    var fetchMeasurements = function (location) {
      return Stations.one(location.id.toString()).one('measurements', location.measurements.toLowerCase()).get().then(
        function(data) {
          return transformData("Station: " + location.name + " " + location.measurements, data);
        }
      )
    };

    function clearMeasurements() {
      $scope.data = [];
    }

  });
