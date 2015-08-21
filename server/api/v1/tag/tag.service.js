'use strict';

var q = require("q");

module.exports = tagService;

function tagService() {

    var service = {
        getTags: getTags
    };

    return service;

    function getTags() {
        var deferred = q.defer();

        deferred.resolve([{"name": "Bride"}, {"name": "Vantage"}, {"name": "DBS"}]);

        return deferred.promise;
    }
}
