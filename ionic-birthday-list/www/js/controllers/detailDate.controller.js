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
            console.log('estamos!' + $stateParams.contact);
        }

    }
})();
