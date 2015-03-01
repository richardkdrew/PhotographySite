(function () {
  'use strict';
  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService', 'detectionService'];

  function picturesService($q, dataService, detectionService) {

    var self = this;
    self.pictures = [];
    self.tags = [
      'vantage'
    ];

    // Initialise paging details
    self.paging = {
      "perPage": setPerPage(detectionService),
      "currentPage" : 0
    };

    var service = {
      getNextPage   : getNextPage,
      hasMorePages  : hasMorePages

    };
    return service;

    function getNextPage(tags) {
      var deferred = $q.defer();

      self.paging.currentPage++;
      self.tags = tags;

      dataService.getPictures(self.paging.currentPage, self.paging.perPage, self.tags).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;
        deferred.resolve(data.pictures);
      }

      function getPicturesFailed(data, code) {
        console.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function hasMorePages() {
      return self.paging.currentPage < self.paging.totalPages;
    }
  }

  function setPerPage(detectionService) {
    var perPage = 50;
    if (detectionService.isMobile()) {
      perPage = 10;
    }
    return perPage;
  }
})();
