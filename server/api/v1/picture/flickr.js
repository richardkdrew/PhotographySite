'use strict';

var config = require('config');

var FlickrLoader = flickrLoader;

function flickrLoader(offset, limit, tags) {

  // Convert the offset and limit to Flickr paging params
  var page = 1;
  if(offset > 0) page = Math.round((offset / limit) + 1);

  this.options = config.get('Flickr.apiConfig');
  this.options.qs.page      = page;
  this.options.qs.per_page  = limit;
  this.options.qs.tags      = tags;
}

FlickrLoader.prototype.mapToResponse = mapToResponse;

function mapToResponse(data, url) {
  var payload = JSON.parse(data);

  // Sort by id
  payload.photos.photo.sort(function(a,b) {return a.id - b.id});

  // Convert the Flickr paging to offset and limit
  var limit = payload.photos.perpage;
  var page = payload.photos.page;
  var offset =  (page * limit) - limit;
  var total = payload.photos.total;

  var tags = this.options.qs.tags;

  return {
    "pictures": mapPictures(payload.photos.photo),
    "meta": {
      "paging": {
        "limit": limit,
        "offset": offset,
        "total": total,
        "links": generateLinks(limit, offset, total, tags, url)
        //"totalPictures": payload.photos.total
      },
      "result": {
        "status": payload.stat,
        "code": payload.code,
        "message": payload.message
      }
    }
  };
}

function mapPictures(pictures) {
  var mappedPictures = [];

  pictures.forEach(function(element) {

    var picture = {id: element.id, title: element.title, url: element.url_m, width: element.width_m, height: element.height_m };
    mappedPictures.push(picture);
  });

  return mappedPictures;
}

function generateLinks(limit, offset, total, tags, url) {

  var links = {};

  if(total > 0) {
    // generate next link
    if((offset + limit) <= total)
    {
      links.next = url + generateLink(limit, (offset + limit), tags);
    }

    // generate previous link
    if((offset - limit) > 0)
    {
      links.previous = url + generateLink(limit, (offset - limit), tags);
    }

    // generate first link
    links.first = url + generateLink(limit, 0, tags);

    // generate last link
    links.last = url + generateLink(limit, (total - limit), tags);

    // generate current link
    links.current = generateLink(limit, offset, tags);
  }

  console.log(links);

  return links;
}

function generateLink(limit, offset, tags) {
  return "?limit=" + limit + "&offset=" + offset + "&tags=" + tags;
}

module.exports = flickrLoader;
