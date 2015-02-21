(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'detectionService'];

  function dataService($http, $q, detectionService) {
    var self = this;
    self.nextPage = 1;
    self.perPage = 50;

    var service = {
      getPictures     : getPictures
    };

    return service;

    function getPictures() {

      // limit to 10 pictures at a time if this is a mobile device
      if(detectionService.isMobile()) self.perPage = 10;

      var deferred = $q.defer();

      // Set to default is no paging params are supplied
      //page = page || self.nextPage;
      //perPage = perPage || self.perPage;

      var params = {
        page: self.nextPage,
        per_page: self.perPage
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
