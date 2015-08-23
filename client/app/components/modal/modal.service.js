(function () {
    'use strict';
    angular
        .module('app.modal')
        .factory('modalService', modalService);

    modalService.$inject = ['$q'];

    function modalService($q) {

        var service = {
            open: open

        };
        return service;

        function open(picture) {

            console.log(picture);
        }



    }
})();