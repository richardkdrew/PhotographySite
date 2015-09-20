(function () {
    'use strict';

    angular
        .module('app.modal')
        .controller('Modal', Modal);

    Modal.$inject = ['modalService'];

    function Modal(modalService) {

        var vm = this;
        vm.width = modalService.params().width;
        vm.height = modalService.params().height;
        vm.close = modalService.resolve;
    }
})();
