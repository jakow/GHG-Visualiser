'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MapcontrollerCtrl
 * @description
 * # MapcontrollerCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MapCtrl', function ($scope, $window) {
   $scope.mapOptions =  {
      lat: 54,
      lon: -3.09,
      zoom: 6
    };

    $scope.width = 500; //DOM Manipulation in controller :(
    $scope.height = 700;
    $scope.markers = [{'name':'London', 'lat':51.505, 'lon':-0.09},
      {'name':'Oxford', 'lat':51.751, 'lon':-1.255},
      {'name':'Edinburgh', 'lat':55.953, 'lon':-3.188},
      {'name':'Manchester', 'lat':53.479, 'lon':-2.248}];
  });
