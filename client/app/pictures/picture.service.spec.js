/*
'use strict';


describe('service: picturesService', function () {
    var service, mockDataService, mockDetectionService, deferred;

    //beforeEach(mock.module('ngRoute'), module('app.pictures'));

    //beforeEach(module('app.pictures', 'ngRoute'));

    /*beforeEach(function() {
        module('app.pictures', function($routeProvider) {
            $routeProvider = {};
        });
    });


    beforeEach(function () {
        mockDataService = {
            getPictures     : function () {},
            hasMore         : function () {}
        };

        mockDetectionService = {
            isMobile: function () {}
        };

        sinon.stub(mockDetectionService, 'isMobile', function() {
        });

        module(function ($provide) {
            $provide.value('dataService', mockDataService);
            $provide.value('detectionService', mockDetectionService);
        })
    });

    describe('function: getPictures', function () {

        beforeEach(inject(function ($q, picturesService) {

            service = picturesService;
            deferred = $q.defer();

        }));

        it('should return a promise', function () {

            // Set up the getPictures call to succeed
            sinon.stub(mockDataService, 'getPictures', function () {
                deferred.resolve(mockData.getMockPictures());
                return deferred.promise;
            });

            expect(service.getPictures().then).toBeDefined();
        });


    });
});

*/