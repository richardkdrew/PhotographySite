(function() {
  'use strict';

  angular
    .module('app.pictures')

    .directive('imageLoader', imageLoader);


  function imageLoader() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/pictures/image-loader.html',
      scope: {
        picture: '='
      },
      link: link
    };

    function link(scope, element) {
      scope.isLoading = true;
      scope.newHeight = calculateHeight(element[0], scope.picture.data);

      var image = new Image();

      image.addEventListener('load', imageLoadComplete);
      image.addEventListener('error', imageLoadFailed);

      //image.src = scope.picture.data.url;
      image.alt = scope.picture.data.title;

      function imageLoadComplete() {
        console.info("Loaded picture " + scope.picture.index);
        scope.$apply(function(){
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
