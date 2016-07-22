(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $ionicSideMenuDelegate, $scope, rrssService) {
        var vm = this;

        activate();
        $scope.$on('$ionicView.beforeEnter', beforeEnter);

        function activate() {
            vm.doLogin = doLogin;
            $ionicSideMenuDelegate.canDragContent(false);
        }

        //scope methods
        function doLogin() {

        }

        //private methods
        function beforeEnter() {
            $ionicSideMenuDelegate.canDragContent(false);
        }
    }
})();
