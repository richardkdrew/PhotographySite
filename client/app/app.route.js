(function() {
  'use strict';

  angular.module('app')
    .config(routeConfig);

  routeConfig.$inject = ['$locationProvider'];

  function routeConfig($locationProvider) {
    $locationProvider.html5Mode(true);
  }
})();

