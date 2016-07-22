(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController() {
        var vm = this;

        activate();

        function activate() {
            vm.doLogin = doLogin;
        }

        //scope methods
        function doLogin() {

        }

        //private methods
    }
})();
