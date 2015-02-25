/*(function () {
  'use strict';

    angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

    picturesService.$inject = ['$q', 'dataService', 'detectionService'];

    function picturesService($q, dataService, detectionService) {

      this.lastIndex = 0;
      var self = this;

      self.pictures = [];

      var service = {
        getPictures: getPictures
      };

      return service;

      function getPictures(newPage) {
        var deferred = $q.defer();

        dataService.getPictures(newPage, 50).then(getPicturesComplete, getPicturesFailed);

        function getPicturesComplete(data) {
          addPictures(data.pictures);
          self.paging = data.meta.paging;
          deferred.resolve(data.pictures);
        }

        function getPicturesFailed(data, code) {
          logger.error(code, data);
          deferred.reject(data);
        }

        return deferred.promise;
      }
    }

    function addPictures(pictures) {
      for (var i = 0; i < pictures.length; i++) {
        this.lastIndex += 1;
        pictures[i].index = this.lastIndex;
        self.pictures.push(pictures[i]);
      }
    }
})();*/

