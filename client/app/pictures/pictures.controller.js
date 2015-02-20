(function() {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['dataService'];

  function Pictures(dataService) {

    var vm = this;
    vm.pictures = [];
    vm.loadMore = loadMore;
    vm.loading = false;

    activate();

    function activate() {
      return getPictures().then(function() {
        console.info('Activated Pictures View');
      });
    }

    function getPictures() {

      if (vm.loading) return;
      vm.loading = true;

      return dataService.getPictures().then(function (data) {
        addPictures(data);
        vm.loading = false;
        return vm.pictures;
      })
    }

    function loadMore() {
      return getPictures().then(function() {
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
