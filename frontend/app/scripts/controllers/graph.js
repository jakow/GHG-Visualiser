'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('GraphCtrl', function ($scope, $http) {
    /*$scope.options = {
     chart: {
     type: 'lineWithFocusChart',
     height: 450,
     margin : {
     top: 20,
     right: 20,
     bottom: 60,
     left: 40
     },
     duration: 500,
     useInteractiveGuideline: true,
     x: function(d){return Date.parse(d.date);},
     y: function(d){return d.value;},
     xAxis: {
     axisLabel: 'X Axis',
     tickFormat: function(d){
     return d3.time.format('%x')(new Date(d))
     }
     },
     x2Axis: {
     tickFormat: function(d){
     return d3.format(',f')(d);
     }
     },
     yAxis: {
     axisLabel: 'Y Axis',
     tickFormat: function(d){
     return d3.format(',.2f')(d);
     },
     rotateYLabel: false
     },
     y2Axis: {
     tickFormat: function(d){
     return d3.format(',.2f')(d);
     }
     }

     }
     };*/
    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 40
        },
        duration: 500,
        useInteractiveGuideline: true,
        x: function (d) {
          return Date.parse(d.date);
        },
        y: function (d) {
          return d.value;
        },
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function (d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function (d) {
            return d3.format(',.2f')(d);
          },
          rotateYLabel: false
        },
        zoom: {
          //NOTE: All attributes below are optional
          enabled: true,
          scale: 1,
          scaleExtent: [1, 10],
          translate: [0, 0],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: false,
          zoomed: function (xDomain, yDomain) {
            var domains = {x1: 0, x2: 0, y1: 1, y2: 1};
            return domains;
          },
          unzoomed: function (xDomain, yDomain) {
            var domains = {x1: 0, x2: 0, y1: 0, y2: 0};
            return domains;
          },
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

    $http.get('http://demo9799735.mockable.io/stations/1/measurements/co2')
      .then(function (response) {
        var data = [];
        var values = response.data.measurements;
        data.push({
          "key": "trace",
          "values": values
        });
        console.log(data);
        $scope.data = data;
      });

    console.log(generateData());
    /* Random Data Generator (took from nvd3.org) */
    function generateData() {
      return stream_layers(3, 10 + Math.random() * 200, .1).map(function (data, i) {
        return {
          key: 'Stream' + i,
          values: data
        };
      });
    }

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
      if (arguments.length < 3) o = 0;
      function bump(a) {
        var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
        for (var i = 0; i < m; i++) {
          var w = (i / m - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      return d3.range(n).map(function () {
        var a = [], i;
        for (i = 0; i < m; i++) a[i] = o + o * Math.random();
        for (i = 0; i < 5; i++) bump(a);
        return a.map(stream_index);
      });
    }

    function stream_index(d, i) {
      return {x: i, y: Math.max(0, d)};
    }
  });
