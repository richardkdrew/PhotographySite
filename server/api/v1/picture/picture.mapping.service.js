'use strict';

var q = require("q");

module.exports = pictureMappingService;

function pictureMappingService() {

  var service = {
    mapPicturesResponse: mapPicturesResponse
  };

  return service;

  function mapPicturesResponse(data, url, tags) {
    var deferred = q.defer();

    deferred.resolve(doMapping(data, url, tags));

    return deferred.promise;
  }

  function doMapping(data, url, tags){
    var payload = data;
    var picturesResponse = {};
    picturesResponse.meta = {};

    picturesResponse.meta.paging = getPagingMetadata(payload);
    picturesResponse.meta.result = mapResultMetadata(payload);

    if (payload.photos.photo && payload.photos.photo.length > 0) {
      var limit = picturesResponse.meta.paging.limit;
      var offset = picturesResponse.meta.paging.offset;
      var total = picturesResponse.meta.paging.total;

      picturesResponse.pictures = mapPictures(payload.photos.photo);
      picturesResponse.meta.paging.links = getPagingLinks(limit, offset, total, tags, url);
    }

    return picturesResponse;

    function mapPictures(pictures) {
      var mappedPictures = [];

      pictures.forEach(function (element) {

        var picture = {
          id: element.id,
          title: element.title,
          small: {
            url: element.url_m,
            width: Number(element.width_m),
            height: Number(element.height_m)
          },
          medium:
            {
              url: element.url_c,
              width: Number(element.width_c),
              height: Number(element.height_c)
            },
          large:
            {
              url: element.url_o,
              width: Number(element.width_o),
              height: Number(element.height_o)
            },
          tags: element.tags.split(" ")
        };
        mappedPictures.push(picture);
      });
      // Sort by id
      pictures.sort(function (a, b) {
        return a.id - b.id
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

    function getPagingMetadata(payload) {
      var paging = {};
      paging.limit = Number(payload.photos.perpage);
      paging.offset = Number((payload.photos.page * paging.limit) - paging.limit);
      paging.total = Number(payload.photos.total) || 0;

      return paging;
    }

    function getPagingLinks(limit, offset, total, tags, originalUrl) {

      // set up the url to use for paging links
      var url = originalUrl;
      if (originalUrl.indexOf('?')) {
        url = originalUrl.substring(0, originalUrl.indexOf('?'));
      }

      var links = {};

      if (total > 0) {
        // generate next link
        if ((offset + limit) <= total) {
          links.next = url + generateLink(limit, (offset + limit), tags);
        }

        // generate previous link
        if ((offset - limit) > 0) {
          links.previous = url + generateLink(limit, (offset - limit), tags);
        }

        // generate first link
        links.first = url + generateLink(limit, 0, tags);

        // generate last link
        links.last = url + generateLink(limit, (total - limit), tags);

        // generate current link
        links.current = url + generateLink(limit, offset, tags);
      }
      return links;

      function generateLink(limit, offset, tags) {
        var link = "?limit=" + limit + "&offset=" + offset;

        if (tags) {
          link = link + "&tags=" + tags;
        }
        return link;
      }
    }
  }
}
