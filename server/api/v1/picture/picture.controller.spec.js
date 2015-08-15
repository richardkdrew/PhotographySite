'use strict';

describe('controller: picture', function () {
    var controller, mockPictureDataService = {};


    beforeEach(function () {
        // Set up the mocked data service
        mockPictureDataService = {
            loadPictures: function () {
            }
        };

        sinon.stub(mockPictureDataService, 'loadPictures', function () {
            return mockData.loadMockPictures();
        });
    })
});