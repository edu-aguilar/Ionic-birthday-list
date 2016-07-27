(function() {
    'use strict';

    angular
        .module('services')
        .service('closeSessionService', closeSessionService);

    /* @ngInject */
    function closeSessionService($q, $ionicPopup, userService, $state) {

        var confirmPopup;
        var opcPopup = {
             title: 'Cerrar sesión',
             template: '¿Está seguro de que quiere cerrar sesión?'
         };

        return {
            close: close
        };

        function close() {

            var d = $q.defer();
            confirmPopup = $ionicPopup.confirm(opcPopup);

            confirmPopup.then(closeSession);

            function closeSession(userConfirm) {
                if (userConfirm) {
                    userService.reset();
                    $state.go('app.login');
                    d.resolve();
                } else {
                    d.reject();
                }
            }

            return d.promise;
        }
    }
})();
