(function () {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$routeParams', 'picturesService', 'modalService'];

  function Pictures($routeParams, picturesService, modalService) {

    var vm = this;
    vm.pictures = [];
    vm.loadMore = loadMore;
    vm.hasMore = false;
    vm.hasSome = false;
    vm.loadingMore = false;
    vm.ready = false;
    vm.tag = '';
    vm.viewPicture = viewPicture;
    vm.currentPicture = null;

    activate();

    function activate() {
      return loadMore().then(function () {
        vm.ready = true;
        console.info('Activated Pictures View');
      });
    }

    function loadMore() {
      if (vm.loadingMore) {return;}
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
      });
    }

    function viewPicture(picture) {
      vm.currentPicture = picture;
      // The .open() method returns a promise that will be either
      // resolved or rejected when the modal window is closed.
      var promise = modalService.open(
          'single-picture',
          {
            picture: vm.currentPicture,
            width: vm.currentPicture.medium.width,
            height: vm.currentPicture.medium.height
          },
          true
      );
      promise.then(
          function handleResolve() {
            console.log( 'Alert resolved.' );
          },
          function handleReject() {
            console.warn( 'Alert rejected!' );
          }
      );
    }
  }
})();
