(function() {
    'use strict';

    angular
        .module('services')
        .service('userService', userService);

    /* @ngInject */
    function userService() {

        var userModel = {
            fullName: null,
            facebookId: null,
            googleId: null,
            mail: null,
            image: null
        };

        return {
            mergeData: mergeData,
            get: get
        };

        function mergeData(obj) {
            angular.merge(userModel, obj);
        }

        function get() {
            return userModel;
        }
    }
})();
