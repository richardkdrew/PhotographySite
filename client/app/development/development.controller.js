(function () {
  'use strict';

  angular
    .module('app.development')
    .controller('Development', Development);

  function Development() {

    var vm = this;

    activate();

    function activate() {
      console.info('Activated Development View');
    }
  }
})();
