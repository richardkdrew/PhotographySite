(function() {
  'use strict';

  angular.module('app.pages')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'app/pages/about/about.html',
        controller: 'About',
        controllerAs: 'vm',
        title: "Richard Drew Photography : About Me"
      });
  }
})();

