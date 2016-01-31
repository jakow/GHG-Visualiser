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
    $scope.markers = [];
  });
