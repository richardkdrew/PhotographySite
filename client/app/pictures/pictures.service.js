(function () {
  'use strict';

  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService', 'detectionService'];

  function picturesService($q, dataService, detectionService) {

    var self = this;

    // Initialise some local params for paging and pictures
    self.pictures = [];
    self.paging = {};

    var service = {
      getPictures   : getPictures,
      hasMore       : hasMore
    };
    return service;

    function getPictures() {
      var deferred = $q.defer();

      // default url based on device
      var url = 'api/v1/pictures?limit=' + setPerPage(detectionService) + '&offset=0';

      // if there are links alter the url accordingly
      var links = self.paging.links;
      if(links) {
        url = links.next;
      }

      //console.log("url used was", url);

      dataService.getPictures(url).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;
        deferred.resolve(data.pictures);
      }

      function getPicturesFailed(data, code) {
        console.error("Failed to retrieve Pictures", code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function hasMore() {
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
