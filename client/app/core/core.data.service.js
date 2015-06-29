(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q) {

    var service = {
      getPictures     : getPictures,
      getTags         : getTags
    };

    return service;

    function getPictures(url) {
      var deferred = $q.defer();

      $http.get(url)
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

    function getTags() {
      var deferred = $q.defer();

      $http.get('api/v1/tags')
        .success(getTagsComplete)
        .error(getTagsFailed);

      function getTagsComplete(data) {
        deferred.resolve(data);
      }

      function getTagsFailed(data, code) {
        console.error('XHR Failed for getTags.' + data, code);
        deferred.reject(data);
      }

      return deferred.promise;
    }
  }
})();
