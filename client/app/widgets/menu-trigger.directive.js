(function () {
  'use strict';
  angular
    .module('app.widgets')
    .directive('menuTrigger', menuTrigger);
  function menuTrigger() {
    return {
      restrict: 'A',
      link: link
    };
    function link(scope, element) {
      element.on('click', menuTriggerClick);
      scope.$on('destroy', cleanUp);

      function menuTriggerClick() {
        scope.$emit('ToggleMenu_Event');
        //console.log('triggered ToggleMenu_Event')
      }

      function cleanUp() {
        element.off('click', menuTriggerClick);
      }
    }
  }
}());
