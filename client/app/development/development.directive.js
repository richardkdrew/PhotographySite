(function() {
  'use strict';

  angular
    .module('app.development')
    .directive('devMenu', devMenu);

  function devMenu() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: 'app/development/menu.html',
      link: link
    };

    function link(scope, element) {

      // Listen for the ToggleMenu event
      scope.$on('ToggleMenu_Event', toggleMenu);

      // Initialise the menu state
      scope.menuState = !scope.menuState;

      function toggleMenu() {
        scope.$apply(function(){
          if(scope.menuState == 'open')
          {
            console.log('Toggle Menu - Close!');
            scope.menuState = 'closed';
          }
          else {
            console.log('Toggle Menu - Open!');
            scope.menuState = 'open';
          }
          element.toggleClass('show');
        });
      }
    }
  }
}());
