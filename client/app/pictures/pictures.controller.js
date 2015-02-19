(function() {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$q', 'dataService'];

  function Pictures($q, dataService) {

    var vm = this;
    vm.pictures = [];
    vm.title = 'Pictures';
    vm.currentPage = 0;
    vm.loadMore = loadMore;
    vm.loading = false;

    activate();

    function activate() {
      var promises = [getPictures()];
      return $q.all(promises).then(function() {
        console.info('Activated Pictures View');
      });
    }

    function getPictures(pageNumber, perPage) {
      if (vm.loading) return;
      vm.loading = true;

      return dataService.getPictures(pageNumber, perPage).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          //console.info(data[i].data);
          vm.pictures.push(data[i]);
        }
        vm.currentPage = pageNumber;
        vm.loading = false;
        //vm.pictures = data;
        //return vm.pictures;
      })
    }

    function loadMore() {
      getPictures(vm.currentPage + 1);

      /*if (vm.loading) return;
      vm.loading = true;

      var pageNumber = vm.currentPage + 1;
      //console.info('Loading ' + pageNumber);
      return dataService.getPictures(pageNumber).then(function (data) {
        for (var i = 0; i < data.length; i++) {
          //console.info(data[i].data);
          vm.pictures.push(data[i]);
        }
        vm.currentPage = pageNumber;
        vm.loading = false;
        //console.info(pageNumber + ' loaded');
        //return vm.pictures;
      });*/
    }
  }
})();
