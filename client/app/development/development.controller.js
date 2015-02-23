(function () {
  'use strict';

  angular
    .module('app.development')
    .controller('Development', Development);

  function Development() {

    var vm = this;
    vm.menuVisible = false;
    vm.showMenu = showMenu;
    vm.hideMenu = hideMenu;

    activate();

    function activate() {
      console.info('Activated Development View');
    }

    function showMenu() {
      console.info('Show Menu');
      vm.menuVisible = true;
    }

    function hideMenu() {
      console.info('Hide Menu');
      vm.menuVisible = false;
    }
  }
})();
