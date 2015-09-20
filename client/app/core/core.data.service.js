(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q) {

    var self = this;
    self.pictures = [];
    self.tags = [];

    var service = {
      getPictures     : getPictures,
      getTags         : getTags
    };

    return service;

    function getPictures(url) {
      var deferred = $q.defer();

      $http.get(url)
        .success(getPicturesComplete)
        .error(getPicturesFailed);

      function getPicturesComplete(data) {
        //console.log(JSON.stringify(data));
        //deriveTags(data.pictures);

        deferred.resolve(data);
      }

      function getPicturesFailed(error, data) {
        console.error('XHR Failed for getPictures.' + error, data);
        deferred.reject(error, data);
      }

      return deferred.promise;
    }

    function getTags() {
      var deferred = $q.defer();

      $http.get('api/v1/tags')
        .success(getTagsComplete)
        .error(getTagsFailed);

      function getTagsComplete(data) {
        deferred.resolve(data);
      }

      function getTagsFailed(data, code) {
        console.error('XHR Failed for getTags.' + data, code);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    /*
    function deriveTags(pictures) {

      console.log(pictures);

      var allTags = [];

      // Derive tags from pictures
      for(var picIndex = 0; picIndex < pictures.length; ++picIndex) {
        allTags = allTags.concat(pictures[picIndex].tags);
      }

      // Get just the unique tags
      self.tags = getUniqueTags(allTags);

      console.log(self.tags);

      function getUniqueTags(tags) {
        var u = {}, a = [];
        for(var i = 0, l = tags.length; i < l; ++i){
          if(u.hasOwnProperty(tags[i])) {
            continue;
          }
          a.push(tags[i]);
          u[tags[i]] = 1;
        }
        return a;
      }
    }*/
  }
})();
