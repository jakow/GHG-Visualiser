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
      restrict: 'E',
      transclude: true,
      //obtain scope from html markup
      scope: {
        range: '=',
        chartOptions: '=options'
      },
      controller: function($scope) {
        //array of references to svg traces that represent the plots
        var plots = $scope.plots = [];

        this.addPlot = function(name, data) {

          //TODO: append a plot to svg
        }
      },
      template: "<div></div>"
    }
  })
  .directive('ghgPlot', function (d3Service) {
    return {
      template: '',
      restrict: 'E',
      require: '^ghgChart',
      scope: {
        plotName: "=name",
        plotData: "=data",
        chartStyle: "=style"
      },
      link: function(scope, element, attrs, chartCtrl) {
        chartCtrl.addPlot(scope.name)
      }
    }
  });
