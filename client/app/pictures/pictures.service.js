(function () {
  'use strict';
  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService', 'detectionService'];

  function picturesService($q, dataService, detectionService) {

    var self = this;
    self.pictures = [];
    self.morePagesAvailable = false;
    self.lastIndex = 0;

    // Initialise paging details
    self.currentPage = 0;
    self.perPage = setPerPage(detectionService);
    self.totalPages = 0;

    var service = {
      getNextPage   : getNextPage,
      hasMorePages  : hasMorePages

    };
    return service;

    function getNextPage() {
      //console.log("Inside Pictures Service");
      var deferred = $q.defer();

      var newPage = self.currentPage + 1;

      dataService.getPictures(newPage, self.perPage).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;
        self.morePagesAvailable = self.paging.currentPage < self.paging.totalPages;
        self.currentPage = newPage;
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
    if (detectionService.isMobile) {
      self.perPage = 10;
    }
    else self.perPage = 50;
  }

  /*function setPagingDetails(paging) {
    //this.currentPage = paging.currentPage;
    //this.totalPages = paging.totalPages;
    this.morePagesAvailable = paging.currentPage < paging.totalPages;
  }

  function addPictures(pictures) {
    for (var i = 0; i < pictures.length; i++) {
      this.lastIndex += 1;
      pictures[i].index = self.lastIndex;
      self.pictures.push(pictures[i]);
    }
  }*/
})();
