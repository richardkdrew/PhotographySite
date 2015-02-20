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

    function getPictures(pageNumber, perPage) {
      var deferred = $q.defer();

      pageNumber = pageNumber || 1;
      perPage = perPage || 5;

      var params = {
        page: pageNumber,
        per_page: perPage
      };

      console.info('perpage ' + perPage);
      console.info('page ' + pageNumber);

      console.info('params ' + params);

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
