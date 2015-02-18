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

// Get list of things
exports.index = index;

  function index(req, res) {

    // Set up some default parameters
    var page = req.params.page || 1;
    var per_page = req.params.perpage || 5;

    // Set up the flickr loader
    var flickr = new FlickrLoader(page, per_page);

    request.get(flickr.options,  function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var payload = flickr.mapToResponse(body);

        if (payload.meta.result.status === "fail")
        {
          console.log("Failure: code (" + payload.meta.result.code + "), " + payload.meta.result.message);

          return res.send(500, 'Internal Server Error');
        }
        else {
          var pictures = payload.pictures;
          console.log(pictures);
          res.json(pictures);
        }
      }
    });
  }
