'use strict';

var pictureService = require("./picture.service.js")();
var pictureData = require("./picture.data.service.js")();
var defaultSettings = require("config").get('Flickr.defaults');

// Get list of pictures
exports.index = index;

function index(req, res) {

  // Assign the query params
  var offset = req.query.offset || defaultSettings.offset;
  var limit = req.query.limit || defaultSettings.limit;
  var tags = defaultSettings.tags;

  if(req.query.tags) {
    tags = tags + ',' + req.query.tags;
  }

  pictureData.loadPictures(offset, limit, tags, function (error, result) {
    if (!error) {//&& result.stat === 'ok') {

      var payload = pictureService.buildPictureResponse(result, req.originalUrl, req.query.tags);

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
