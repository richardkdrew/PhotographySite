(function() {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['$q', 'dataService'];

  function Pictures($q, dataService) {

    var vm = this;
    vm.pictures = [];
    vm.currentPage = 1;
    vm.loadMore = loadMore;
    vm.loading = false;

    activate();

    function activate() {
      var promises = [getPictures()];
      return $q.all(promises).then(function() {
        console.info('Activated Pictures View');
      });
    }

    function getPictures() {

      var pageNumber = vm.currentPage;
      console.info("PageNumber was: " + pageNumber);

      if (vm.loading) return;
      vm.loading = true;

      return dataService.getPictures(pageNumber).then(function (data) {

        for (var i = 0; i < data.length; i++) {
          //console.info(data[i].data);
          vm.pictures.push(data[i]);
        }
        vm.currentPage = pageNumber + 1;
        vm.loading = false;
        console.info("PageNumber is: " + vm.currentPage);
      })
    }

    function loadMore() {
      //var pageNumber = Number(vm.currentPage + 1);
      return getPictures().then(function() {
        console.info('Loaded more Pictures');
      });
    }

    /*function loadMore() {
      getPictures(vm.currentPage + 1);

      if (vm.loading) return;
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
       });
    }*/
  }
})();
