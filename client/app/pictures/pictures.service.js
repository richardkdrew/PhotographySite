(function () {
  'use strict';

  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService', 'detectionService'];

  function picturesService($q, dataService, detectionService) {
    var self = this;
    self.isLoading = false;
    self.paging = setPaging(0, 50, 0, 0);
    /*{
      currentPage: 0,
      perPage: 50,
      totalPages: 0,
      totalPictures: 0
    };*/
    self.isMobile = detectionService.isMobile();

    var service = {
      getPictures   : getPictures,
      hasMorePages  : hasMorePages
    };

    return service;

    function getPictures(newPage) {

      if (self.isLoading) return;
       self.isLoading = true;

      setPaging(newPage, calculatePageSize());

      var deferred = $q.defer();

      dataService.getPictures(newPage, self.paging.perPage).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;
        setPaging(newPage, calculatePageSize(), data.meta.paging.totalPages, data.meta.paging.totalPictures);
        deferred.resolve(data.pictures);
      }

      function getPicturesFailed(data, code) {
        logger.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function hasMorePages() {
      if(self.paging == null) return false;
      return self.paging.totalPages > self.paging.currentPage
    }

    function calculatePageSize() {
      // Set the page size based on type of device
      if(self.isMobile) {
        return 10;
      }
      return 50;
    }

    function setPaging(page, perPage, pages, pictures) {
      self.paging = self.paging || {};
      self.paging.page = page || self.paging.page;
      self.paging.perPage = perPage || self.paging.perPage;
      self.paging.totalPages = pages || self.paging.totalPages;
      self.paging.totalPictures = pictures || self.paging.totalPictures;

    }
  }
})();
