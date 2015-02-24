(function() {
  'use strict';

  angular.module('app.pictures')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/pictures', {
        templateUrl: 'app/pictures/pictures.html',
        controller: 'Pictures',
        controllerAs: 'vm',
        title: "Richard Drew Photography : Pictures"//,
        /*resolve: {
         picturesPrepService: picturesPrepService
         }*/
      });

    /*function picturesPrepService(picturesService) {
     return picturesService.getPictures();
     }*/
  }
})();

