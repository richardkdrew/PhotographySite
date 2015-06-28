/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /pictures              ->  index
 * POST    /pictures              ->  create
 * GET     /pictures/:id          ->  show
 * PUT     /pictures/:id          ->  update
 * DELETE  /pictures/:id          ->  destroy
 */

'use strict';

var request = require('request');
var FlickrLoader = require('./flickr.js');

var defaultTags = 'aston+martin';
var defaultLimit = 16;
var defaultOffset = 0;

// Get list of pictures
exports.index = index;

  function index(req, res) {

    console.log(req.originalUrl);

    // Assign the Flickr Api query params
    var offset = req.query.offset || defaultOffset;
    var limit = req.query.limit || defaultLimit;
    var tags = req.query.tags || defaultTags;

    // Set up the Flickr loader
    var flickr = new FlickrLoader(offset, limit, tags);

    //console.log(flickr.options);

    request.get(flickr.options,  function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var payload = flickr.mapToResponse(body);

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
