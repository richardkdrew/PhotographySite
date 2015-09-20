(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('pictureLoader', pictureLoader);

  function pictureLoader() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/widgets/picture-loader.html',
      scope: {
        width: '=w',
        height: '=h',
        title: '=desc',
        url: '='
      },
      link: link
    };

    function link(scope, element) {

      if(scope.url) {

        scope.isLoading = true;
        scope.newHeight = calculateHeight(element[0], scope.width, scope.height);

        var image = new Image();

        image.addEventListener('load', imageLoadComplete);
        image.addEventListener('error', imageLoadFailed);

        image.src = scope.url;
        image.alt = scope.title;
      }

      function imageLoadComplete() {

        //logImageDiagnostics(scope, element[0].clientWidth, scope.newHeight);

        scope.$apply(function(){
          element.css({ 'max-width': scope.width });
          element.css({ 'width': element[0].clientWidth });
          element.css({ 'height': scope.newHeight });
          element.removeAttr('height');
          scope.pictureSrc = image.src;
          scope.isLoading = false;
        });
      }

      function imageLoadFailed() {
        console.log('Failed during picture load ' + image.alt + '!');
        scope.$apply(function(){
          scope.isLoading = false;
        });
      }
    }
  }

  function calculateHeight(container, width, height) {
    var containerWidth = Number(container.clientWidth);
    var ratio = Number(height) / Number(width);
    return Math.ceil(containerWidth * ratio);
  }

  function logImageDiagnostics(scope, newWidth, newHeight) {
    console.log('Id ' + scope.picture.id );
    console.log('Title ' + scope.picture.title );
    console.log('Original Height ' + scope.height );
    console.log('Original Width ' + scope.width );
    console.log('New Height ' + newHeight);
    console.log('New Width ' + newWidth);
    console.log('-----------------------------');
  }

}());
