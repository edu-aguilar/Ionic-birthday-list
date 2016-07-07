(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(newDateService) {
        var vm = this;

        activate();

        function activate() {
            vm.showNewDateModal = showNewDateModal;
        }

        function showNewDateModal() {
            newDateService.createNewDateModal();
        }
    }
})();
