(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state) {
        var vm = this;

        activate();

        function activate() {
            vm.doLogin = doLogin;
        }

        //scope methods
        function doLogin() {
            $state.go('app.home');
        }

        //private methods
    }
})();
