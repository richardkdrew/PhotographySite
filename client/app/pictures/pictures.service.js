(function () {
  'use strict';
  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService', 'detectionService'];

  function picturesService($q, dataService, detectionService) {

    var self = this;
    self.pictures = [];

    // Initialise paging details
    self.paging = {
      "limit": setPerPage(detectionService),
      "offset" : 0
    };

    var service = {
      getNextPage   : getNextPage,
      hasMorePages  : hasMorePages

    };
    return service;

    function getNextPage() {
      var deferred = $q.defer();

      var next = self.paging.next || "";

      dataService.getPictures(next).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;

        console.log(self.paging);

        deferred.resolve(data.pictures);
      }

      function getPicturesFailed(data, code) {
        console.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function hasMorePages() {
      return self.paging.offset < self.paging.total;
    }
  }

  function setPerPage(detectionService) {
    var perPage = 52;
    if (detectionService.isMobile()) {
      perPage = 16;
    }
    return perPage;
  }
})();
