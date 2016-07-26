(function() {
    'use strict';

    angular.module('services')
        .factory('rrssService', rrssService);

    function rrssService($cordovaOauth, $q, $http, $ionicLoading, userService){

        var facebookAppId = '1735260246693734';
        var googleClientId = '153461763037-qpcqe450jhnlmga2sknnig3df9mb34od.apps.googleusercontent.com';

        return {
            getFacebookToken: getFacebookToken,
            getGoogleToken: getGoogleToken,
            getFacebookUserInfo: getFacebookUserInfo,
            getGoogleUserInfo: getGoogleUserInfo,
            facebookLogin: facebookLogin,
            googleLogin: googleLogin
        };

        function getFacebookToken() {
            var d = $q.defer();
            $cordovaOauth.facebook(facebookAppId, ["email"], {"auth_type": "rerequest"})
              .then(getFacebookTokenSuccess, getFacebookTokenError);

              function getFacebookTokenSuccess(result) {
                  d.resolve(result.access_token);
              }

              function getFacebookTokenError(error) {
                  d.reject(error);
              }

           return d.promise;
        }

        function getGoogleToken() {
            var d = $q.defer();
            $cordovaOauth.google(googleClientId,
                ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"])
                .then(getGoogleTokenSuccess, getGoogleTokenError);

                function getGoogleTokenSuccess(result) {
                    d.resolve(result.access_token);
                }

                function getGoogleTokenError(error) {
                    d.reject(error);
                }
            return d.promise;
        }

        function getFacebookUserInfo(token) {
            $ionicLoading.show();
            var d = $q.defer();
            //documentacion con campos disponibles sobre el usuario
            //https://developers.facebook.com/docs/graph-api/reference/v2.5/user
            var infoRequest = {
                params: {
                    access_token: token,
                    fields: "id,name,gender,location,website,picture,relationship_status,email",
                    format: "json"
                }
            };
            $http.get("https://graph.facebook.com/v2.5/me", infoRequest)
              .then(getFacebookUserInfoSuccess, getFacebookUserInfoError);

                function getFacebookUserInfoSuccess(result) {
                    $ionicLoading.hide();
                    d.resolve(result.data);
                }

                function getFacebookUserInfoError(error) {
                    $ionicLoading.hide();
                    d.reject(error);
                    console.log(error);
                }
            return d.promise;
        }

        function getGoogleUserInfo(token) {
            $ionicLoading.show();
            var d = $q.defer();
            $http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token)
              .then(getGoogleUserInfoSuccess, getGoogleUserInfoError);

                function getGoogleUserInfoSuccess(result) {
                    $ionicLoading.hide();
                    var data = {
                        uid: result.data.id,
                        firstName: result.data.name.givenName,
                        lastName: result.data.name.familyName,
                        mail: result.data.emails[0].value,
                        image: result.data.image.url
                    };
                    d.resolve(data);
                }

                function getGoogleUserInfoError(error) {
                    $ionicLoading.hide();
                    d.reject(error);
                }
            return d.promise;
        }

        function facebookLogin() {
            var d = $q.defer();

            if (!isWebBrowser()) {
                getGoogleToken()
                  .then(getGoogleTokenSuccess, getGoogleTokenError);
            } else {
                d.reject('navegador');
            }

            getFacebookToken()
              .then(getFacebookTokenSuccess, getFacebookTokenError);

            function getFacebookTokenSuccess(token) {
                getFacebookUserInfo(token)
                  .then(getFacebookUserInfoSuccess, getFacebookUserInfoError);

                function getFacebookUserInfoSuccess(data) {
                    d.resolve(formatFacebookResponse(data));
                }
                function getFacebookUserInfoError(error) {
                    d.reject(error);
                }
            }
            function getFacebookTokenError(error) {
                d.reject(error);
            }
            return d.promise;
        }


        function googleLogin() {
            var d = $q.defer();

            if (!isWebBrowser()) {
                getGoogleToken()
                  .then(getGoogleTokenSuccess, getGoogleTokenError);
            } else {
                d.reject('navegador');
            }

            function getGoogleTokenSuccess(token) {
                getGoogleUserInfo(token)
                  .then(getGoogleUserInfoSuccess, getGoogleUserInfoError);

                function getGoogleUserInfoSuccess(data) {
                    d.resolve(formatGoogleResponse(data));
                }
                function getGoogleUserInfoError(error) {
                    d.reject(error);
                }
            }
            function getGoogleTokenError(error) {
                d.reject(error);
            }
            return d.promise;
        }

        //private
        function formatGoogleResponse(data) {
            var obj = {
                fullName: data.firstName + ' ' + data.lastName,
                googleId: data.uid,
                mail: data.mail,
                image: data.image
            };
            userService.mergeData(obj);
            return obj;
        }

        function formatFacebookResponse(data) {
            var obj = {
                fullName: data.name,
                facebookId: data.id,
                mail: data.email,
                image: data.picture.data.url
            };
            userService.mergeData(obj);
            return obj;
        }

        function isWebBrowser() {
            if (window.cordova) {
                return false;
            } else {
                console.log('login fake desde navegador');
                //set fake user
                userService.mergeData({
                    fullName: 'Edu testing',
                    facebookId: '',
                    googleId: '',
                    mail: 'edutesting@gmail.com',
                    image: ''
                });
                return true;
            }
        }
    }

})();
