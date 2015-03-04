(function () {
  'use strict';

  angular
    .module('app.menu')
    .controller('Menu', Menu);

  Menu.$inject = ['$location', 'menuService'];

  function Menu($location, menuService) {

    var vm = this;
    vm.ready = false;
    vm.items = [];
    vm.menuClass = menuClass;

    activate();

    function activate() {
      return loadMenuItems().then(function () {
        vm.ready = true;
        console.info('Activated Menu View');
      });
    }

    function loadMenuItems() {
      return menuService.getMenuItems().then(function (data) {
        vm.items = data;
        return vm.items;
      })
    }

    function menuClass(page) {
      var current = $location.path();
      /*console.log("Page: " + page);
      console.log("Current: " + current);*/
      return page === current ? "active" : "";
    }
  }
})();
