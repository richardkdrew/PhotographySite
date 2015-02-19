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

      pageNumber = pageNumber | 1;
      perPage = perPage | 5;

      console.log('perpage ' + perPage);
      console.log('page ' + pageNumber);

      $http.get('api/pictures/page/' + pageNumber +'/perpage/' + perPage)
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
