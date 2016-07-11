(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('NewDateController', NewDateController);

    /* @ngInject */
    function NewDateController(newDateService) {
        var vm = this;

        activate();

        function activate() {
            vm.closeDateModal = closeDateModal;
        }

        function closeDateModal() {
            var modal = newDateService.getModal().hide();
        }
    }
})();
