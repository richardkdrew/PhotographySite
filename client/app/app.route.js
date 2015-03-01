(function() {
  'use strict';

  angular.module('app')
    .config(routeConfig)
    .run(appRun);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/development/development.html',
        controller: 'Development',
        controllerAs: 'vm',
        title: 'Development'
      }).otherwise({redirectTo: '/pictures'});

    $locationProvider.html5Mode(true);
  }

  appRun.$inject = ['$rootScope'];

  function appRun($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $rootScope.title = current.$$route.title;
    });
  }

})();

