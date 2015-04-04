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
//var config = require('config');

// Get list of things
exports.index = index;

  function index(req, res) {

    /*var defaults = config.get('Flickr.defaults');

    var tags = defaults.mandatoryTags;
    var defaultPerPage = defaults.perPage;
    var defaultPage = defaults.page;

    // Add any additional tags
    if(req.query.tags != null) tags = tags + '+' + req.query.tags;*/

    // Assign the Flickr Api query params
    var page = req.query.page;
    var perPage = req.query.per_page;
    var tags = req.query.tags;

    // Set up the Flickr loader
    var flickr = new FlickrLoader(page, perPage, tags);

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
