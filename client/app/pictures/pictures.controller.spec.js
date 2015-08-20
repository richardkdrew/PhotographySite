/*
'use strict';

describe('controller: pictures', function () {
    var controller, mockPicturesService = {}, scope;

    beforeEach(function () {
        module('app.pictures');

        inject(function ($rootScope, $q, $controller) {
            scope = $rootScope.$new();

            // Set up the mock menu service
            mockPicturesService = {
                getPictures: function () {
                }
            };

            sinon.stub(mockPicturesService, 'getPictures', function () {
                var deferred = $q.defer();
                deferred.resolve([{"name": "Vanquish"}, {"name": "Vantage"}, {"name": "DBS"}]);
                return deferred.promise;
            });

            // Set up the controller under test
            controller = $controller('Pictures', {
                $scope: scope, $routeParams: {},
                picturesService: mockPicturesService
            });
            $rootScope.$apply();
        });
    });

    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    describe('after activate function is called', function () {

        it('should have 3 pictures loaded', function () {
            expect(controller.items.length).toEqual(3);
        });

        it('should have called the picturesService:getPictures method', function () {
            expect(mockMenuService.getPictures.called).toBeTruthy();
        });
    });
});
*/