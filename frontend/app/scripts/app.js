'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'restangular',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'openlayers-directive',
    'nvd3'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('API_BASE_URL', "http://demo9799735.mockable.io/")
  .run(function(Restangular, API_BASE_URL) {
    Restangular.setBaseUrl(API_BASE_URL);
  })
  ;


