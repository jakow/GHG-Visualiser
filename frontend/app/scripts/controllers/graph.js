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

    $scope.$watch(function() {return locationData.location}, function(newData) {$scope.location = newData});

    $scope.getdata = function() {
      locationData.getLocationData("1");
    }
    var fetchMeasurements = function (request) {
/*      var url = 'http://demo9799735.mockable.io/';
      url += "stations/" + request.station + "/measurements/";
      if (request.measurements !== "all") url += request.measurements.toLowerCase();

      return $http.get(url)
        .then(function (response) {
          return transformData("Series name", response.data); //data must be an array of data series
        });*/
      return Stations.one(request.station).one('measurements', request.measurements.toLowerCase()).get().then(
        function(data) {
          console.log(data);
          return transformData("Station " + request.station + " " + request.measurements, data);
        }
      )
    };

    function clearMeasurements() {
      $scope.data = [];
    }

    fetchMeasurements({station: "1", measurements: "CO2"}).then(function (data) {
      $scope.data.push(data);
    });

  });
