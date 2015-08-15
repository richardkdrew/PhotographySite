'use strict';

var pictureService = require("./picture.service.js")();
var pictureData = require("./picture.data.service.js")();


// Get list of pictures
exports.index = index;

function index(req, res) {

    pictureData.loadPictures(req.query.offset, req.query.limit, req.query.tags, function (error, result) {
        if (!error) {//&& result.stat === 'ok') {

            var payload = pictureService.buildPictureResponse(result, req.originalUrl, req.query.tags);

            if (payload.meta.result.status === "fail") {
                console.log("Failure: code (" + payload.meta.result.code + "), " + payload.meta.result.message);
                return res.send(500, 'Internal Server Error');
            }
            else {
                res.json(payload);
            }
        }
    });
}
