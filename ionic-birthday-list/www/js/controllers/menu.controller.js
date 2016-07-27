(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(newDateService, userService, $state, closeSessionService) {
        var vm = this;

        activate();

        function activate() {
            vm.showNewDateModal = showNewDateModal;
            vm.user = userService.get();
            vm.closeSession = closeSessionService.close;
        }

        function showNewDateModal() {
            newDateService.createNewDateModal();
        }

    }
})();
