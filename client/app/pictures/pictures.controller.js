(function () {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$routeParams','picturesService'];

  function Pictures($routeParams, picturesService) {

    var vm = this;
    vm.pictures = [];
    vm.loadMore = loadMore;
    vm.hasMore = false;
    vm.loadingMore = false;
    vm.ready = false;

    activate();

    function activate() {
      return loadMore().then(function () {
        vm.ready = true;
        console.info('Activated Pictures View');
      });
    }

    function loadMore() {
      if (vm.loadingMore) return;
      vm.loadingMore = true;

      // Grab the tag from the url
      var tag = $routeParams.tag;

      return picturesService.getPictures(tag).then(function (data) {
        console.log(data);
        vm.pictures = vm.pictures.concat(data);
        vm.hasMore = picturesService.hasMore();
        vm.loadingMore = false;
        return vm.pictures;
      })
    }
  }
})();
