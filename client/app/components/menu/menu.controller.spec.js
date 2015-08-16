'use strict';

describe('controller: menu', function () {
    var controller, mockMenuService = {}, scope;

    beforeEach(function () {
        module('app.menu');

        inject(function($rootScope, $q, $controller) {
            scope = $rootScope.$new();

            // Set up the mock menu service
            mockMenuService = {
                getMenuItems: function () {}
            };

            sinon.stub(mockMenuService, 'getMenuItems', function() {
                var deferred = $q.defer();
                deferred.resolve([{"name": "Vanquish"}, {"name": "Vantage"}, {"name": "DBS"}]);
                return deferred.promise;
            });

            // Set up the controller under test
            controller = $controller('Menu', { $scope: scope,
                menuService: mockMenuService
            });
            $rootScope.$apply();
        });
    });

    it('should be defined', function () {
        expect(controller).toBeDefined();
    });

    describe('after initialise function is called', function() {

        it('should have 3 menu items loaded', function() {
            expect(controller.items.length).toEqual(3);
        });

        it('should have called the menuService:getMenuItems method', function () {
            expect(mockMenuService.getMenuItems.called).toBeTruthy();
        });

    });

});