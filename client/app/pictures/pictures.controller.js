(function () {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$routeParams','picturesService'];

  function Pictures($routeParams, picturesService) {

    var vm = this;
    vm.ready = false;
    vm.loadingMore = false;
    vm.pictures = [];
    vm.lastIndex = 0;
    vm.loadMore = loadMore;
    vm.hasMore = false;

    activate();

    function activate() {
      return loadMore().then(function () {
        vm.ready = true;
        console.info('Activated Pictures View');
      });
    }

    function addPictures(pictures) {
      for (var i = 0; i < pictures.length; i++) {
        vm.lastIndex += 1;
        pictures[i].index = vm.lastIndex;
        vm.pictures.push(pictures[i]);
      }
    }

    function loadMore() {
      if (vm.loadingMore) return;
      vm.loadingMore = true;

      // Grab the tag from the url
      var tag = $routeParams.tag;
      console.log(tag);

      return picturesService.getNextPage(tag).then(function (data) {
        //vm.pictures.concat(data);
        addPictures(data);
        vm.hasMore = picturesService.hasMorePages();
        vm.loadingMore = false;
        return vm.pictures;
      })
    }

  }
})();
