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

        //scope methods
        function closeDateModal() {
            var modal = newDateService.getModal().hide();
        }

        function addDate() {
          console.log(vm.newDate);
          closeDateModal();
          initModelVars();
        }

        //private mthods
        function initModelVars() {
            vm.newDate = {};
            vm.wantAlertNotif = false;
            vm.timeAlertNotif = null;
        }
    }
})();
