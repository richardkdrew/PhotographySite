(function() {
  'use strict';

  angular.module('app').config(routeConfig);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/pictures', {
        templateUrl: 'app/pictures/pictures.html',
        controller: 'Pictures',
        controllerAs: 'vm'
      }).otherwise({redirectTo: '/pictures'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

})();

