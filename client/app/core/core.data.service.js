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

    function getPictures() {
      var deferred = $q.defer();

      $http.get('api/pictures')
        .success(getPicturesComplete)
        .error(getPicturesFailed);

      function getPicturesComplete(data) {
        deferred.resolve(data);
      }

      function getPicturesFailed(data, code) {
        $log.error('XHR Failed for getPictures.' + data, code);
        deferred.reject(data);
      }

      return deferred.promise;
    }
  }
})();
