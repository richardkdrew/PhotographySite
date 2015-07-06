'use strict';

module.exports = mapperService;

function mapperService() {

  var service = {
    loadPictures: loadPictures
  };

  return service;

  function loadPictures(offset, limit, tags, callback) {
    var Flickr = require("flickrapi");
    var options = require("config").get("Flickr.apiConfig");

    // Convert the offset and limit to Flickr paging params
    var page = 1;
    if(offset > 0) page = Math.round((offset / limit) + 1);

    // Set up the query string options
    options.qs.page      = page;
    options.qs.per_page  = limit;
    options.qs.tags      = tags;

    // Authenticate with Flickr
    Flickr.authenticate(options, function (error, flickr) {
      // search for photos
      flickr.photos.search(options.qs, callback);
    });
  }
}


