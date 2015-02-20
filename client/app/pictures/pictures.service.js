(function() {
  'use strict';

  angular
    .module('app.pictures')
    .factory('picturesService', picturesService);

  picturesService.$inject = ['$q', 'dataService'];

  function picturesService($q, dataService) {
    var self = this;
    self.pictures = [];
    self.nextPage = 1;
    //self.isLoading = false;;

    var service = {
      getPictures     : getPictures
    };

    return service;

    function getPictures() {

      /*if (self.isLoading) return;
      self.isLoading = true;*/

      var deferred = $q.defer();

      dataService.getPictures(self.nextPage).then(getPicturesComplete, getPicturesFailed);

      function getPicturesComplete(data) {
        /*for (var i = 0; i < data.length; i++) {
          self.pictures.push(data[i]);
        }
        self.isLoading = false;*/
        self.pictures = data;
        self.nextPage += 1;
        deferred.resolve(self.pictures);
      }

      function getPicturesFailed(data, code) {
        logger.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

  }
})();
