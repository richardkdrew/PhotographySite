(function() {
  'use strict';

  angular.module('app')
    .config(routeConfig)
    .run(appRun);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/development', {
        templateUrl: 'app/development/development.html',
        controller: 'Development',
        controllerAs: 'vm',
        title: 'Development'
      }).otherwise({redirectTo: '/pictures'});
  }

  appRun.$inject = ['$rootScope'];

  function appRun($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current) {
      $rootScope.title = current.$$route.title;
    });
  }

})();

