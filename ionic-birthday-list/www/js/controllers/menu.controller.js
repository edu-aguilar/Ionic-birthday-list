(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(newDateService, userService) {
        var vm = this;

        activate();

        function activate() {
            vm.showNewDateModal = showNewDateModal;
            vm.user = userService.get();
        }

        function showNewDateModal() {
            newDateService.createNewDateModal();
        }
    }
})();
