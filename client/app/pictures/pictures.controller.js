(function () {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$routeParams','picturesService', 'modalService'];

  function Pictures($routeParams, picturesService, modalService) {

    var vm = this;
    vm.pictures = [];
    vm.loadMore = loadMore;
    vm.hasMore = false;
    vm.hasSome = false;
    vm.loadingMore = false;
    vm.ready = false;
    vm.tag = "";
    vm.viewPicture = viewPicture;

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
      vm.tag = $routeParams.tag;

      // if the tags are different reset the pictures collection
      if(vm.tag !== picturesService.tag) {
        vm.pictures = [];
      }

      return picturesService.getPictures(vm.tag).then(function (data) {
        vm.pictures = vm.pictures.concat(data);
        vm.hasMore = picturesService.hasMore();
        vm.hasSome = picturesService.hasSome();
        vm.tag = picturesService.getTag();
        vm.loadingMore = false;
        return vm.pictures;
      })
    }

    function viewPicture(picture) {
      modalService.open(picture);
    }
  }
})();
