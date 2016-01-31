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
          axisLabel: 'Numbers',
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
      function(newData) {
        if (!_.isEmpty(newData)) {
          $scope.location = newData;
          var request = {};
          request.id = newData.id;
          request.measurements = "CO2";
          fetchMeasurements(request).then(function(measurements) {
            $scope.data = [measurements];
          })
        }
      }
    );

    $scope.getdata = function() {
      locationData.getLocationData("1");
    };
    var fetchMeasurements = function (request) {
      return Stations.one(request.id.toString()).one('measurements', request.measurements.toLowerCase()).get().then(
        function(data) {
          return transformData("Station " + request.id + " " + request.measurements, data);
        }
      )
    };

    function clearMeasurements() {
      $scope.data = [];
    }

    fetchMeasurements({id: "1", measurements: "CO2"}).then(function (data) {
      $scope.data.push(data);
    });

  });
