(function() {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['detectionService', 'dataService'];

  function Pictures(detectionService, dataService) {

    var vm = this;
    vm.pictures = [];
    vm.loadMore = loadMore;
    vm.loading = false;
    vm.isMobile = detectionService.isMobile();

    activate();

    function activate() {
      return getPictures().then(function() {
        console.info('Activated Pictures View');
      });
    }

    function getPictures() {
      return dataService.getPictures().then(function (data) {
        addPictures(data);
        return vm.pictures;
      })
    }

    function loadMore() {

      if (vm.loading) return;
      vm.loading = true;

      return getPictures().then(function() {
        vm.loading = false;
        console.info('Loaded more Pictures');
      });
    }

    function addPictures(pictures)
    {
      for (var i = 0; i < pictures.length; i++) {
        vm.pictures.push(pictures[i]);
      }
    }
  }
})();
