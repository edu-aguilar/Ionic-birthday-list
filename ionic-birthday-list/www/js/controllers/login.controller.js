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
        function doLogin(index) {
            if (index === 1) {
                doFacebookLogin();
            } else if (index === 2) {
                doGoogleLogin();
            } else {
                rrssService.fakeLogin();
                $state.go('app.home');
            }
        }

        //private methods
        function beforeEnter() {
            $ionicSideMenuDelegate.canDragContent(false);
        }

        function doFacebookLogin() {
            rrssService.facebookLogin()
              .then(facebookLoginSuccess, facebookLoginError);

            function facebookLoginSuccess(data) {
                successRrssLogin(data);
            }

            function facebookLoginError(err) {
                console.log(err);
                if (err === 'navegador') {
                    $state.go('app.home');
                }
            }
        }

        function doGoogleLogin() {
            rrssService.googleLogin()
              .then(googleLoginSuccess, googleLoginError);

            function googleLoginSuccess(data) {
                successRrssLogin(data);
            }

            function googleLoginError(err) {
                console.log(err);
                if (err === 'navegador') {
                    $state.go('app.home');
                }
            }
        }

        function successRrssLogin(data) {
            alert(JSON.stringify(data));
            $state.go('app.home');
        }
    }
})();
