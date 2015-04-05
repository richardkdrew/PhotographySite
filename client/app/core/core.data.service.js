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

    function getPictures(nextPage, perPage, tags) {
      var deferred = $q.defer();

      var defaultTags = 'aston+martin';
      var defaultPerPage = 16;
      var defaultPage = 1;

      // Add any additional tags
      if(tags != null) defaultTags = defaultTags + '+' + tags;

      // Set to default is no paging params are supplied
      nextPage = nextPage || defaultPage;
      perPage = perPage || defaultPerPage;

      var params = {
        page: nextPage,
        per_page: perPage,
        tags: defaultTags
      };

      $http.get('api/v1/pictures', { params: params } )
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
