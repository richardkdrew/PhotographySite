'use strict';

describe('factory: dataService', function () {
  var service, $httpBackend;

  beforeEach(module('app.core'));

  beforeEach(function () {

    inject(function($injector) {
      service = $injector.get('dataService');
    })
  });

  it('should be defined', function ()
  {
    expect(service).toBeDefined();
  });

  describe('function: getPictures', function() {

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET('api/v1/pictures?limit=52&offset=0')
        .respond(mockData.getMockPictures());
    }));

    it('should be defined', function () {
      expect(service.getPictures()).toBeDefined();
    });

    it('should return a promise', function () {
      expect(service.getPictures().then).toBeDefined();
    });
  });

  describe('function: getTags', function() {

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET('api/v1/tags')
        .respond([{"name": "Vanquish"}, {"name": "Vantage"}, {"name": "DBS"}]);
    }));

    it('should be defined', function () {
      expect(service.getTags()).toBeDefined();
    });

    it('should return a promise', function () {
      expect(service.getTags().then).toBeDefined();
    });

    it('should return 3 tags', function () {
      service.getTags().then(function(data) {
        expect(data.length).toEqual(3);
      });
      $httpBackend.flush();
    });
  });

});
