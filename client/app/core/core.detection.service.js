(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('detectionService', detectionService);

  function detectionService() {

    var service = {
      isMobile     : isMobile
    };

    return service;

    function isMobile() {
     return navigator.userAgent.match(/Mobi/i);
    }
  }
})();
