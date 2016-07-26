(function() {
    'use strict';

    angular
        .module('services')
        .service('backButtonService', backButtonService);

    /* @ngInject */
    function backButtonService($state, $ionicPlatform, $ionicHistory) {

        var deregisterFunction = null;

        return {
            disableBack: disableBack,
            registerAction: registerAction,
            goHome: goHome,
            goBack: goBack,
            deregisterAction: deregisterAction,
            closeApp: closeApp
        };

        function disableBack() {
            deregisterFunction = angular.copy($ionicPlatform.registerBackButtonAction(null, 101));
        }

        function registerAction(cb, priority) {
            deregisterFunction = angular.copy($ionicPlatform.registerBackButtonAction(cb, priority));
        }

        function goHome() {
            deregisterFunction = angular.copy($ionicPlatform.registerBackButtonAction(function() {
                $state.go('app.home');
            }, 101));
        }

        function goBack() {
            deregisterFunction = angular.copy($ionicPlatform.registerBackButtonAction(function() {
                $ionicHistory.goBack();
            }, 101));
        }

        function deregisterAction() {
            if (deregisterFunction) {
                deregisterFunction();
            }
            goBack();//default behaviour
        }

        function closeApp() {
            deregisterFunction = angular.copy($ionicPlatform.registerBackButtonAction(function() {
                ionic.Platform.exitApp();
            }, 101));
        }
    }
})();
