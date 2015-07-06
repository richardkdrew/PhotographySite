'use strict';

var pagingService = require("./paging.service.js")();

module.exports = pictureService;

function pictureService() {

  var service = {
    buildPictureResponse  : buildPictureResponse
  };

  return service;

  function buildPictureResponse(data, url, tags) {
    var payload = data;
    var picturesResponse = {};
    picturesResponse.meta = {};

    picturesResponse.meta.paging = pagingService.getPagingMetadata(payload);
    picturesResponse.meta.result = mapResultMetadata(payload);

    console.log(payload.photos.photo);

    if(payload.photos.photo && payload.photos.photo.length > 0) {
      var limit = picturesResponse.meta.paging.limit;
      var offset = picturesResponse.meta.paging.offset;
      var total = picturesResponse.meta.paging.total;

      picturesResponse.pictures = mapPictures(payload.photos.photo);
      picturesResponse.meta.paging.links = pagingService.getPagingLinks(limit, offset, total, tags, url);
    }

    return picturesResponse;

    function mapPictures(pictures) {
      // Sort by id
      pictures .sort(function(a,b) {return a.id - b.id});

      var mappedPictures = [];

      pictures.forEach(function(element) {

        var picture = {id: element.id, title: element.title, url: element.url_m, width: Number(element.width_m), height: Number(element.height_m), tags: element.tags };
        mappedPictures.push(picture);
      });

      return mappedPictures;
    }

    function mapResultMetadata(payload) {
      var mappedResult = {};
      mappedResult.status = payload.stat;
      mappedResult.code = payload.code;
      mappedResult.message = payload.message;

      return mappedResult;
    }
  }
}
