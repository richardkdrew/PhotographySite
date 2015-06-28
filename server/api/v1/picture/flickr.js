'use strict';

var request = require('request');
var config = require('config');

var FlickrLoader = flickrLoader;

function flickrLoader(offset, limit, tags) {

  this.options = config.get('Flickr.apiConfig');

  // Convert the offset and limit to Flickr paging params
  var page = 1;
  if(offset > 0) page = Math.round((offset / limit) + 1);

  //console.log("Offset", offset);
  //console.log("Limit", limit);

  this.options.qs.page      = page;
  this.options.qs.per_page  = limit;
  this.options.qs.tags      = tags;

  //console.log(this.options);
}

FlickrLoader.prototype.mapToResponse = mapToResponse;

function mapToResponse(data) {
  var payload = JSON.parse(data);

  // Sort by id
  payload.photos.photo.sort(function(a,b) {return a.id - b.id});

  // Convert the Flickr paging to offset and limit
  var limit = payload.photos.perpage;
  var page = payload.photos.page;

  // Calculate offset
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
        "links": generateLinks(limit, offset, total, tags)
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

function generateLinks(limit, offset, total, tags) {

  var links = {};

  /*
  console.log("Offset", offset);
  console.log("Limit", limit);
  console.log("Total", total);
  console.log("Offset + Limit", offset+limit);
  console.log("Total - Offset", total-offset);
  */

  // generate next link
  if((offset + limit) > total)
  {
    links.next = null;
  }
  else links.next = generateLink(limit, (offset + limit), tags);

  // generate previous link
  if((offset - limit) <= 0)
  {
    links.previous = null;
  }
  else links.previous = generateLink(limit, (offset - limit), tags);

  // generate first link
  links.first = generateLink(limit, 0, tags);

  // generate last link
  links.last = generateLink(limit, (total - limit), tags);

  // generate current link
  links.current = generateLink(limit, offset, tags);

  //console.log(links);

  return links;
}

function generateLink(limit, offset, tags) {
  return "?limit=" + limit + ",offset=" + offset + ",tags=" + tags;
}

module.exports = FlickrLoader;
