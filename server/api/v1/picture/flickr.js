'use strict';

var config = require('config');

function flickrLoader(offset, limit, defaultTags, selectedTags) {

  // Convert the offset and limit to Flickr paging params
  var page = 1;
  if(offset > 0) page = Math.round((offset / limit) + 1);

  var tags = defaultTags;
  if(selectedTags) {
    tags = tags + '+' + selectedTags;
  }

  this.options = config.get('Flickr.apiConfig');
  this.options.qs.page      = page;
  this.options.qs.per_page  = limit;
  this.options.qs.tags      = tags;
}

flickrLoader.prototype.mapToResponse = mapToResponse;

function mapToResponse(data, url, tags) {
  var payload = JSON.parse(data);

  var picturesResponse = {};
  picturesResponse.meta = {};

  picturesResponse.meta.paging = mapPagingMetadata(payload);
  picturesResponse.meta.result = mapResultMetadata(payload);

  if(payload.photos.photo) {
    picturesResponse.pictures = mapPictures(payload.photos.photo);
    picturesResponse.meta.paging.links = generateLinks(picturesResponse.meta.paging, tags, url);
  }

  return picturesResponse;
}

function mapPictures(pictures) {
  // Sort by id
  pictures .sort(function(a,b) {return a.id - b.id});

  var mappedPictures = [];

  pictures.forEach(function(element) {

    var picture = {id: element.id, title: element.title, url: element.url_m, width: element.width_m, height: element.height_m };
    mappedPictures.push(picture);
  });

  return mappedPictures;
}

function mapPagingMetadata(payload) {
  var mappedPaging = {};

  mappedPaging.limit = payload.photos.perpage;
  mappedPaging.offset = (payload.photos.page * mappedPaging.limit) - mappedPaging.limit;
  mappedPaging.total = payload.photos.total || 0;

  return mappedPaging;
}

function mapResultMetadata(payload) {
  var mappedResult = {};

  mappedResult.status = payload.stat;
  mappedResult.code = payload.code;
  mappedResult.message = payload.message;

  return mappedResult;
}

function generateLinks(pagingMetadata, tags, url) {

  var limit = pagingMetadata.limit;
  var offset = pagingMetadata.offset;
  var total = pagingMetadata.total;

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
    links.current = url + generateLink(limit, offset, tags);
  }

  return links;
}

function generateLink(limit, offset, tags) {
  var link = "?limit=" + limit + "&offset=" + offset;

  if(tags) {
    link = link + "&tags=" + tags;
  }
  return link;
}

module.exports = flickrLoader;
