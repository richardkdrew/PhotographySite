(function() {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['dataService'];

  function Pictures(dataService) {

    var vm = this;
    vm.pictures = [];
    vm.currentPage = 1;
    vm.loadMore = loadMore;
    vm.loading = false;

    activate();

    function activate() {
      return getPictures().then(function() {
        console.info('Activated Pictures View');
      });
    }

    function getPictures() {

      //console.info("PageNumber was: " + vm.currentPage);

      if (vm.loading) return;
      vm.loading = true;

      return dataService.getPictures(vm.currentPage).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          vm.pictures.push(data[i]);
        }
        vm.currentPage += 1;
        vm.loading = false;
        //console.info("PageNumber is: " + vm.currentPage);
        return vm.pictures;
      })
    }

    function loadMore() {
      return getPictures().then(function() {
        console.info('Loaded more Pictures');
      });
    }
  }
})();
