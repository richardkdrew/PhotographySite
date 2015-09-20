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
    self.tag = '';

    var service = {
      getPictures : getPictures,
      hasMore     : hasMore,
      hasSome     : hasSome,
      getTag      : getTag
    };
    return service;

    function getPictures(tag) {
      var deferred = $q.defer();

      var url = generateUrl(tag);

      dataService.getPictures(url).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        self.paging = data.meta.paging;
        deferred.resolve(data.pictures);
      }

      function getPicturesFailed(data, code) {
        console.error('Failed to retrieve Pictures', code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function hasMore() {
      return (self.paging.limit + self.paging.offset) < self.paging.total;
    }

    function hasSome() {
      return self.paging.total > 0;
    }

    function getTag() {
      return self.tag;
    }

    function setPerPage() {
      var perPage = 52;
      if (detectionService.isMobile()) {
        perPage = 16;
      }
      return perPage;
    }

    function generateUrl(tag) {

      // default url based on page size (device)
      var url = 'api/v1/pictures?limit=' + setPerPage() + '&offset=0';

      if(tag) {
        url = url + '&tags=' + tag;
      }

      // if we're talking about the same category/tag then get the next link (if there is one)
      if(self.tag === tag) {
        // if there are links alter the url accordingly
        var links = self.paging.links;
        if (links) {
          url = links.next;
        }
      }
      self.tag = tag;

      return url;
    }
  }
})();
