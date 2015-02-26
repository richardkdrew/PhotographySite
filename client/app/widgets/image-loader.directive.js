(function() {
  'use strict';

  angular
    .module('app.widgets')

    .directive('imageLoader', imageLoader);


  function imageLoader() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/widgets/image-loader.html',
      scope: {
        picture: '='
      },
      link: link
    };

    function link(scope, element) {

      var picture = scope.picture.data;

      scope.isLoading = true;
      scope.newHeight = calculateHeight(element[0], picture);

      var image = new Image();

      image.addEventListener('load', imageLoadComplete);
      image.addEventListener('error', imageLoadFailed);

      image.src = picture.url;
      image.alt = picture.title;

      function imageLoadComplete() {
        //console.info("Loaded picture " + picture.index);
        scope.$apply(function(){
          element.css({ "max-width": picture.width });
          element.css({ "width": element.clientWidth });
          element.css({ "height": scope.newHeight });
          element.removeAttr("height");
          scope.imageSrc = image.src;
          scope.isLoading = false;
        });
      }

      function imageLoadFailed() {
        console.log("Failed during picture load " + image.alt + "!");
        scope.$apply(function(){
          scope.isLoading = false;
        });
      }
    }
  }

  function calculateHeight(container, item) {
    var containerWidth = Number(container.clientWidth);
    var ratio = Number(item.height) / Number(item.width);
    return Math.ceil(containerWidth * ratio);
  }

}());