'use strict';

var q = require("q");
var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: process.env.API_KEY,
        secret: process.env.SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };

module.exports = pictureDataService;

function pictureDataService() {

    var service = {
        loadPictureData: loadPictureDataFromFlickr
    };

    return service;

    function loadPictureDataFromFlickr(offset, limit, tags) {
        var deferred = q.defer();

        var options = {
            qs: {
                authenticated: true,
                tag_mode: "all",
                format: "json",
                extras: "url_m,tags",
                nojsoncallback: 1
            }
        };

        // Convert the offset and limit to Flickr paging params
        var page = 1;
        if (offset > 0) page = Math.round((offset / limit) + 1);

        // Set up the query string options
        options.qs.page = page;
        options.qs.per_page = limit;
        options.qs.tags = tags;
        options.qs.user_id = process.env.USER_ID;

        // Authenticate with Flickr
        Flickr.authenticate(flickrOptions, function (error, flickr) {
            if (!error) {

                // Search for photos
                flickr.photos.search(options.qs, searchComplete);
            }
            else searchFailed(new Error("Authentication failed: " + error), flickr);

            function searchComplete(error, data) {
                if (error !== false || data.stat !== 'ok') {
                    searchFailed(new Error("The search failed: " + data), data);
                }
                else deferred.resolve(data);
            }

            function searchFailed(error, data) {
                console.error(error);
                deferred.reject(error, data);
            }
        });

        return deferred.promise;
    }
}
