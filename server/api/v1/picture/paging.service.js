'use strict';

module.exports = pagingService;

function pagingService() {

    var service = {
        getPagingMetadata: getPagingMetadata,
        getPagingLinks: getPagingLinks
    };

    return service;

    function getPagingMetadata(payload) {
        var paging = {};
        paging.limit = Number(payload.photos.perpage);
        paging.offset = Number((payload.photos.page * paging.limit) - paging.limit);
        paging.total = Number(payload.photos.total) || 0;

        return paging;
    }

    function getPagingLinks(limit, offset, total, tags, originalUrl) {

        // set up the url to use for paging links
        var url = originalUrl;
        if (originalUrl.indexOf('?')) {
            url = originalUrl.substring(0, originalUrl.indexOf('?'));
        }

        var links = {};

        if (total > 0) {
            // generate next link
            if ((offset + limit) <= total) {
                links.next = url + generateLink(limit, (offset + limit), tags);
            }

            // generate previous link
            if ((offset - limit) > 0) {
                links.previous = url + generateLink(limit, (offset - limit), tags);
            }

            // generate first link
            links.first = url + generateLink(limit, 0, tags);

            // generate last link
            links.last = url + generateLink(limit, (total - limit), tags);

            // generate current link
            links.current = url + generateLink(limit, offset, tags);
        }
        return links;

        function generateLink(limit, offset, tags) {
            var link = "?limit=" + limit + "&offset=" + offset;

            if (tags) {
                link = link + "&tags=" + tags;
            }
            return link;
        }
    }
}
