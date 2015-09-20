(function() {
    'use strict';

    angular
        .module('app.modal')
        .directive('modal', modal);

        function modal($rootScope, modalService) {
            return {
                restrict: 'A',
                templateUrl: 'app/components/modal/modal.html',
                transclude: true,
                link: link
            };

            function link(scope, element) {

                scope.subview = null;

                element.on('click', function handleClickEvent(event) {
                        if (element[0] !== event.target) {
                            return;
                        }
                        scope.$apply(modalService.reject);
                    }
                );

                // Listen for 'open' events emitted by the modals service object.
                $rootScope.$on('modal.open', function handleModalOpenEvent(event, modalType, params) {
                        scope.subview = modalType;
                        scope.params = params;
                    }
                );
                // Listen for 'close' events emitted by the modals service object.
                $rootScope.$on('modal.close', function handleModalCloseEvent(event, params) {
                        scope.subview = null;
                        scope.params = null;
                    }
                );
            }
        }
}());
