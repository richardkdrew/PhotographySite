(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('Layout', Layout);

  Layout.$inject = ['$timeout', '$log'];

  function Layout($timeout, $log) {

    /*jshint validthis: true */
    var vm = this;
    vm.title = "Richard Drew Photography";
    vm.showLoadingScreen = true;

    activate();

    function activate() {
      $log.info(vm.title + ' loaded!');
      hideLoadingScreen();
    }

    function hideLoadingScreen() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        vm.showLoadingScreen = false;
      }, 1000);
    }
  }
})();
