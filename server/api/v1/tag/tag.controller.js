'use strict';

var tagService = require("./tag.service.js")();

// Get list of tags
exports.index = index;

function index(req, res) {

    tagService.getTags(req).then(getTagsComplete, getTagsFailed);

    function getTagsComplete(payload) {
        res.json(payload);
    }

    function getTagsFailed(error, payload) {
        console.log("Error: " + error, payload);
        return res.send(500, 'Internal Server Error');
    }
}
