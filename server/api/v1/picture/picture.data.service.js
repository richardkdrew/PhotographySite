'use strict';

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key             : process.env.API_KEY,
        secret              : process.env.SECRET,
        access_token        : process.env.ACCESS_TOKEN,
        access_token_secret : process.env.ACCESS_TOKEN_SECRET
    };
var options = require("config").get("Flickr.apiConfig");
var defaultSettings = require("config").get('Flickr.defaults');

module.exports = mapperService;

function mapperService() {

    var service = {
        loadPictures: loadPictures
    };

    return service;

    function loadPictures(offset, limit, tags, callback) {

        // Assign the query params
        offset = offset || defaultSettings.offset;
        limit = limit || defaultSettings.limit;
        var defaultTags = process.env.DEFAULT_TAGS;

        if (tags) {
            tags = defaultTags + ',' + tags;
        }

        // Convert the offset and limit to Flickr paging params
        var page = 1;
        if (offset > 0) page = Math.round((offset / limit) + 1);

        // Set up the query string options
        options.qs.page = page;
        options.qs.per_page = limit;
        options.qs.tags = tags;

        // Authenticate with Flickr
        Flickr.authenticate(flickrOptions, function (error, flickr) {
            // search for photos
            flickr.photos.search(options.qs, callback);
        });
    }
}


