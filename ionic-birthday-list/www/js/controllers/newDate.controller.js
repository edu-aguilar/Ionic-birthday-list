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
            vm.newDate = {};
            vm.closeDateModal = closeDateModal;
            vm.addDate = addDate;
        }

        function closeDateModal() {
            var modal = newDateService.getModal().hide();
        }

        function addDate() {
          console.log(vm.newDate);
          closeDateModal();
          vm.newDate = {};
        }
    }
})();
