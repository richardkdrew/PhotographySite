/** flickr.js **/

var request = require('request');
var Picture = require('./picture.js');
var config = require('config');

var FlickrLoader = function (page, perPage, tags) {


  this.options = config.get('Flickr.apiConfig');

  // Set the parameter based options
  //this.options.qs.api_key     =       process.env.FLICKR_API_KEY;
  this.options.qs.tags        =       tags;
  this.options.qs.per_page    =       perPage;
  this.options.qs.page        =       page;

  console.log(this.options);
};

FlickrLoader.prototype.mapToResponse = mapToResponse;

function mapToResponse(data) {
  var payload = JSON.parse(data);

  // Sort by id
  payload.photos.photo.sort(function(a,b) {return a.id - b.id});

  return {
    "pictures": mapPictures(payload.photos.photo),
    "meta": {
      "paging": {
        "perPage": payload.photos.perpage,
        "currentPage": payload.photos.page,
        "totalPages": payload.photos.pages,
        "totalPictures": payload.photos.total
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
    mappedPictures.push(new Picture({id: element.id, title: element.title, url: element.url_m, width: element.width_m, height: element.height_m }));
  });

  return mappedPictures;
}

module.exports = FlickrLoader;
