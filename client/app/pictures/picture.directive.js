(function() {
  'use strict';

  angular
    .module('app.pictures')

    .directive('myPicture', picture);


  function picture() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '/app/pictures/picture.html',
      scope: {
        picture: '='
      },
      link: link
    };

    function link(scope, element) {
      scope.isLoading = true;

      var clientWidth = Number(element[0].clientWidth);
      var height = Number(scope.picture.data.height);
      var width = Number(scope.picture.data.width);

      //scope.imageSrc = "/assets/images/tinytrans.gif";

      scope.newHeight = calculateHeight(clientWidth, width, height);

      var image = new Image();

      image.addEventListener('load', imageLoadComplete);
      image.addEventListener('error', imageLoadFailed);

      image.src = scope.picture.data.url;
      image.alt = scope.picture.data.title;

      function imageLoadComplete() {
        console.log("Loaded picture " + image.alt);

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

  function calculateHeight(clientWidth, width, height) {
    var ratio = height / width;
    //console.log('ratio = ' + ratio);
    //console.log('calculated height = ' + Math.ceil(clientWidth * ratio));
    return Math.ceil(clientWidth * ratio);
  }

}());
