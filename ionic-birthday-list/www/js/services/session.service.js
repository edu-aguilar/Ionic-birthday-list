(function() {
    'use strict';

    angular
        .module('services')
        .service('sessionService', sessionService);

    /* @ngInject */
    function sessionService($http, $q) {
        return {
            authenticate: authenticate
        };

        function authenticate(userData) {
            /*
              userdata = {fullName, facebookId || googleId, mail, image}
            */
            var d = $q.defer();
            var _data = {
                userId: userData.facebookId || userData.googleId
            };

            //$http.post('http://localhost:1990/api/authenticate', _data).then(authenticateSuccess, authenticateError);
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http({
            url: 'http://localhost:1990/api/authenticate',
            method: "POST",
            data: { userId : 1 }
            }).then(authenticateSuccess, authenticateError);

            function authenticateSuccess(res) {
                d.resolve(res.data);
            }

            function authenticateError(res) {
                d.reject(res.data.message);
            }
            return d.promise;
        }
    }
})();
