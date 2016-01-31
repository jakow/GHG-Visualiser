'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:ghgChart
 * @description
 * # ghgChart
 */
angular.module('frontendApp')
  .directive('ghgChart', function (d3Service) {
    return {
      template: '<div></div>',
      restrict: 'E',

      //obtain scope from html markup
      scope: {
        range: '=',
        chartOptions: '=options'
      },
      link: function (scope, element, attrs) {
        d3Service.d3().then(function (d3) {
          //create an svg element
          var svg = d3.select(element[0])
            .append("svg")
            .style('width', '100%');
        })
      }
    }
  });
