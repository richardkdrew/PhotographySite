(function () {
  'use strict';

  angular
    .module('app.menu')
    .controller('Menu', Menu);

  Menu.$inject = ['menuService'];

  function Menu(menuService) {

    var vm = this;
    vm.ready = false;
    vm.items = [];

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
  }
})();
