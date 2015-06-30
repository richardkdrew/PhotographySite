'use strict';

var request = require('request');
var flickrLoader = require('./flickr.js');

var defaultTags = 'aston+martin';
var defaultLimit = 16;
var defaultOffset = 0;

// Get list of pictures
exports.index = index;

function index(req, res) {

  // set up the url to use for paging links
  var linkUrl = getLinkUrl(req.originalUrl);

  // Assign the Flickr Api query params
  var offset = req.query.offset || defaultOffset;
  var limit = req.query.limit || defaultLimit;
  var tags = req.query.tags;

  console.log(tags);

  // Set up the Flickr loader
  var flickr = new flickrLoader(offset, limit, defaultTags, tags);

  request.get(flickr.options,  function (error, response, body) {
    if (!error && response.statusCode === 200) {

      var payload = flickr.mapToResponse(body, linkUrl, tags);

      if (payload.meta.result.status === "fail")
      {
        console.log("Failure: code (" + payload.meta.result.code + "), " + payload.meta.result.message);

        return res.send(500, 'Internal Server Error');
      }
      else {
        res.json(payload);
      }
    }
  });
}

function getLinkUrl(originalUrl) {
  // find the query string params
  var queryStringStartPosition = originalUrl.indexOf('?');

  // set up the url to use for paging links
  var linkUrl = originalUrl;
  if(queryStringStartPosition) {
    linkUrl = originalUrl.substring(0, queryStringStartPosition);
  }

  return linkUrl;
}
