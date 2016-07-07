(function() {
    'use strict';

    angular.module('services')
        .service('newDateService', newDateService);

    function newDateService($ionicModal) {

        var modal = null;

        return {
            createNewDateModal: createNewDateModal,
            getModal: getModal
        }

        function createNewDateModal() {

            if (modal) {
                modal.show();
                return;
            }
            $ionicModal.fromTemplateUrl('templates/modals/newDate.html', {
                animation: 'slide-in-up'
            }).then(function(_modal) {
                modal = _modal;
                modal.show();
            });
        }

        function getModal() {
            return modal;
        }

    }

})();
