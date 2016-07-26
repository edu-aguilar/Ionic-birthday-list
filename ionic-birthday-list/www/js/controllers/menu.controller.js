(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(newDateService, userService, $state) {
        var vm = this;

        activate();

        function activate() {
            vm.showNewDateModal = showNewDateModal;
            vm.user = userService.get();
            vm.closeSession = closeSession;
        }

        function showNewDateModal() {
            newDateService.createNewDateModal();
        }

        function closeSession() {
            userService.reset();
            $state.go('app.login');
        }
    }
})();
