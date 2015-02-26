(function() {
  'use strict';

  angular
    .module('app.development')
    .directive('devMenuTrigger', devMenuTrigger);

  function devMenuTrigger() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      element.on('click', menuTriggerClick);

      scope.$on('destroy', cleanUp);

      function menuTriggerClick() {
        scope.$emit('ToggleMenu_Event');
      }

      function cleanUp() {
        element.off('click', menuTriggerClick);
      }
    }
  }
}());
