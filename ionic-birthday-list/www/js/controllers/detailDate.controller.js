(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('DetailDateController', DetailDateController);

    /* @ngInject */
    function DetailDateController($stateParams) {
        var vm = this;

        activate();

        function activate() {
            //scope methods
            var vm = this;
            initModel();
        }

        function initModel() {
            vm.relatedImage = $stateParams.contact.img;
            vm.detailDate = {};
            vm.detailDate.name = $stateParams.contact.name;
            vm.detailDate.subject = $stateParams.contact.subject;
            vm.detailDate.date = new Date;
            vm.wantAlertNotif = $stateParams.contact.wantAlertNotif;
            vm.timeAlertNotif = $stateParams.contact.timeAlertNotif;
        }
    }
})();
