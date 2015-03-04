(function() {
  'use strict';

  angular.module('app.pictures')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/pictures/:tag', {
        templateUrl: 'app/pictures/pictures.html',
        controller: 'Pictures',
        controllerAs: 'vm',
        title: "Richard Drew Photography : Pictures"
      })
      .when('/pictures', {
        templateUrl: 'app/pictures/pictures.html',
        controller: 'Pictures',
        controllerAs: 'vm',
        title: "Richard Drew Photography : Pictures"
      }).otherwise('/pictures');
  }
})();

