(function() {
  'use strict';

  angular
    .module('app.development')
    .directive('menu', menu);

  function menu() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: 'app/widgets/menu.html',
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
          console.log(element);
          element.toggleClass('show');
        });
      }
    }
  }
}());
