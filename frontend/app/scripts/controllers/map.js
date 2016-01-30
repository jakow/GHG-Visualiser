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
      lat: 51.505,
      lon: -0.09,
      zoom: 8
    };

    //$scope.width = 800; //DOM Manipulation in controller :(
    $scope.height = 300;

  });
