(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q) {
    var self = this;
    self.nextPage = 1;
    self.perPage = 5;

    var service = {
      getPictures     : getPictures
    };

    return service;

    function getPictures(page, perPage) {
      var deferred = $q.defer();

      // Set to default is no paging params are supplied
      page = page || self.nextPage;
      perPage = perPage || self.perPage;

      var params = {
        page: page,
        per_page: perPage
      };

      /*
      console.info('page ' + page);
      console.info('perpage ' + perPage);
      */

      $http.get('api/pictures', { params: params } )
        .success(getPicturesComplete)
        .error(getPicturesFailed);

      function getPicturesComplete(data) {
        self.nextPage += 1;
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
