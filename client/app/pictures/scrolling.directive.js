(function() {
  'use strict';

  angular
    .module('app.pictures')
    .directive('whenScrolled', whenScrolled);


  function whenScrolled() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      console.info(element);

      var originalElement = element[0];

      console.log('loading directive');

      element.bind('scroll', function () {
        /*console.log('in scroll');
        console.log(originalElement.scrollTop + originalElement.offsetHeight);
        console.log(originalElement.scrollHeight);*/

        if (originalElement.scrollTop + originalElement.offsetHeight >= originalElement.scrollHeight - 10) {
          scope.$apply(attrs.whenScrolled);
        }
      });

    }
  }

}());
