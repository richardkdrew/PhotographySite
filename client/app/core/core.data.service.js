(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q) {

    var service = {
      getPictures     : getPictures
    };

    return service;

    function getPictures(nextPage, perPage) {
      var deferred = $q.defer();

      // Set to default is no paging params are supplied
      nextPage = nextPage || 1;
      perPage = perPage || 10;

      var params = {
        page: nextPage,
        per_page: perPage
      };

      $http.get('api/pictures', { params: params } )
        .success(getPicturesComplete)
        .error(getPicturesFailed);

      function getPicturesComplete(data) {
        deferred.resolve(data);
      }

      function getPicturesFailed(data, code) {
        console.error('XHR Failed for getPictures.' + data, code);
        deferred.reject(data);
      }

      return deferred.promise;
    }
  }
})();
