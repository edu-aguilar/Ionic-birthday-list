(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $ionicSideMenuDelegate, $scope, rrssService, backButtonService, sessionService) {
        var vm = this;

        activate();
        $scope.$on('$ionicView.beforeEnter', beforeEnter);
        $scope.$on('$ionicView.afterEnter', backButtonService.closeApp);
        $scope.$on('$stateChangeStart', backButtonService.deregisterAction);

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
                sessionService.authenticate({
                    fullName: 'Edu testing',
                    facebookId: '1',
                    mail: 'edutesting@gmail.com'}).then(loginSuccess, loginError);
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
            //API rest authentication method.
            sessionService.authenticate(data).then(loginSuccess, loginError);
        }

        function loginSuccess(res) {
            console.log('fine bra: ' + res);
            //set token
        }

        function loginError(error) {
            console.log('login ERRORASO: ' + error);
            //error, create user probably
        }
    }
})();
