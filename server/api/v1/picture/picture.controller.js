'use strict';

var pictureService = require("./picture.service.js")();

// Get list of pictures
exports.index = index;

function index(req, res) {

  pictureService.getPictures(req).then(getPicturesComplete, getPicturesFailed);

  function getPicturesComplete(payload) {
    res.json(payload);
  }

  function getPicturesFailed(error, payload) {
    console.log("Error: " + error, payload);
    return res.send(500, 'Internal Server Error');
  }
}
