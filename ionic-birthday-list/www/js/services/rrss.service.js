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
            googleLogin: googleLogin,
            fakeLogin: setFakeUser
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
                setFakeUser();
                return true;
            }
        }

        function setFakeUser() {
            userService.mergeData({
                fullName: 'Edu testing',
                facebookId: '',
                googleId: '',
                mail: 'edutesting@gmail.com',
                image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTI3IDI0IDEwMCAxMDAiIGlkPSJtYWxlMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSItMjcgMjQgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxyZWN0IGZpbGw9IiNGNUVFRTUiIGhlaWdodD0iMTAwIiB3aWR0aD0iMTAwIiB4PSItMjciIHk9IjI0Ii8+PHBhdGggZD0iTTM4LDk5LjlsMjcuOSw3LjdjMy4yLDEuMSw1LjcsMy41LDcuMSw2LjZ2OS44SC0yN3YtOS44YzEuMy0zLjEsMy45LTUuNSw3LjEtNi42TDgsOTkuOVY4NWgzMFY5OS45eiIgZmlsbD0iI0U2QzE5QyIvPjxnPjxkZWZzPjxwYXRoIGQ9Ik0zOCw5OS45bDI3LjksNy43YzMuMiwxLjEsNS43LDMuNSw3LjEsNi42djkuOEgtMjd2LTkuOGMxLjMtMy4xLDMuOS01LjUsNy4xLTYuNkw4LDk5LjlWODVoMzBWOTkuOXoiIGlkPSJTVkdJRF8xXyIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9IlNWR0lEXzJfIj48dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjU1ZHSURfMV8iLz48L2NsaXBQYXRoPjxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGQ9Ik0tMjcsODJINzN2NDJILTI3VjgyeiBNMjMsMTEyYzExLDAsMjAtNi4zLDIwLTE0cy05LTE0LTIwLTE0UzMsOTAuMywzLDk4ICAgICBTMTIsMTEyLDIzLDExMnoiIGZpbGw9IiNFNkE0MjIiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIiBkPSJNMjMsMTAyYy0xLjcsMC0zLjktMC40LTUuNC0xLjFjLTEuNy0wLjktOC02LjEtMTAuMi04LjMgICAgIGMtMi44LTMtNC4yLTYuOC00LjYtMTMuM2MtMC40LTYuNS0yLjEtMjkuNy0yLjEtMzVjMC03LjUsNS43LTE5LjIsMjIuMS0xOS4ybDAuMSwwbDAsMGwwLDBsMC4xLDBjMTYuNSwwLjEsMjIuMSwxMS43LDIyLjEsMTkuMiAgICAgYzAsNS4zLTEuNywyOC41LTIuMSwzNWMtMC40LDYuNS0xLjgsMTAuMi00LjYsMTMuM2MtMi4xLDIuMy04LjQsNy40LTEwLjIsOC4zQzI2LjksMTAxLjYsMjQuNywxMDIsMjMsMTAyTDIzLDEwMnoiIGZpbGw9IiNENEIwOEMiLz48cGF0aCBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIiBkPSJNMjMsODJDMTAuMyw4MiwwLDg5LjQsMCw5OC41UzEwLjMsMTE1LDIzLDExNXMyMy03LjQsMjMtMTYuNVMzNS43LDgyLDIzLDgyeiAgICAgIE0yMywxMTFjLTEwLjUsMC0xOS02LTE5LTEzLjVTMTIuNSw4NCwyMyw4NHMxOSw2LDE5LDEzLjVTMzMuNSwxMTEsMjMsMTExeiIgZmlsbD0iI0Q5OEMyMSIvPjwvZz48cGF0aCBkPSJNMjMsOThjLTEuNSwwLTMuNS0wLjMtNC44LTAuOWMtMS42LTAuNy03LjItNC42LTkuMS02LjNjLTIuNS0yLjMtMy44LTUuMS00LjItMTBTMyw1OC41LDMsNTQuNSAgICBDMyw0OC44LDguMSw0MCwyMyw0MGwwLDBsMCwwbDAsMGwwLDBDMzcuOSw0MCw0Myw0OC44LDQzLDU0LjVjMCw0LTEuNSwyMS41LTEuOSwyNi40cy0xLjYsNy43LTQuMiwxMGMtMS45LDEuNy03LjYsNS42LTkuMSw2LjMgICAgQzI2LjUsOTcuNywyNC41LDk4LDIzLDk4TDIzLDk4eiIgZmlsbD0iI0YyQ0VBNSIvPjxwYXRoIGQ9Ik0zMCw4NS41Yy0xLjksMi01LjIsMy04LjEsMi40Yy0yLjctMC42LTQuNy0yLTUuNy00LjNMMzAsODUuNXoiIGZpbGw9IiNBMzcwNUYiLz48cGF0aCBkPSJNMjMuNyw4OC42Yy0wLjYsMC0xLjMtMC4xLTEuOS0wLjJjLTMtMC42LTUuMS0yLjItNi4xLTQuNmMtMC4xLTAuMiwwLTAuNCwwLjEtMC41ICAgIGMwLjEtMC4xLDAuMy0wLjIsMC41LTAuMmwxMy44LDJjMC4yLDAsMC4zLDAuMiwwLjQsMC4zYzAuMSwwLjIsMCwwLjQtMC4xLDAuNUMyOC45LDg3LjUsMjYuMyw4OC42LDIzLjcsODguNnogTTE3LjEsODQuMiAgICBjMSwxLjYsMi43LDIuNyw0LjksMy4yYzAuNSwwLjEsMS4xLDAuMiwxLjcsMC4yYzEuOSwwLDMuOS0wLjYsNS4yLTEuN0wxNy4xLDg0LjJ6IiBmaWxsPSIjQTM3MDVGIi8+PGc+PGRlZnM+PHJlY3QgaGVpZ2h0PSI1IiBpZD0iU1ZHSURfM18iIHdpZHRoPSIzMSIgeD0iNyIgeT0iNjUiLz48L2RlZnM+PGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+PHVzZSBvdmVyZmxvdz0idmlzaWJsZSIgeGxpbms6aHJlZj0iI1NWR0lEXzNfIi8+PC9jbGlwUGF0aD48Y2lyY2xlIGNsaXAtcGF0aD0idXJsKCNTVkdJRF80XykiIGN4PSIzMiIgY3k9IjY5IiBmaWxsPSIjMjkxRjIxIiByPSIyIi8+PGNpcmNsZSBjbGlwLXBhdGg9InVybCgjU1ZHSURfNF8pIiBjeD0iMTQiIGN5PSI2OSIgZmlsbD0iIzI5MUYyMSIgcj0iMiIvPjwvZz48cGF0aCBkPSJNMTkuNiw2Ni41QzE5LjEsNjUuOCwxNy42LDY0LDE0LDY0Yy00LjEsMC01LjEsMi4zLTUuMSwyLjRsLTEuOS0wLjdjMC4xLTAuMSwxLjQtMy42LDctMy42ICAgIGM0LjYsMCw2LjYsMi40LDcuMiwzLjVMMTkuNiw2Ni41eiIgZmlsbD0iI0NDOTg3MiIvPjxwYXRoIGQ9Ik0yNCw3N2MwLTAuMywwLTcuMSwwLTljMC0yLjUsMi41LTUuOSw4LTZjNS41LDAsNi45LDMuNSw3LDMuNmwtMS45LDAuN2MwLTAuMS0xLTIuMy01LjEtMi40ICAgIGMtNC4xLDAtNiwyLjQtNiw0YzAsMS45LDAsOC45LDAsOUwyNCw3N3oiIGZpbGw9IiNCQjg2NjAiLz48cGF0aCBkPSJNNDEuOCw3Mi4yYzAsMCwwLjgtNi4zLDMuNy03LjJjMC40LTEuOCwxLjUtNywxLjUtOS45cy0wLjMtNS43LTEuOS04LjFjLTEuOC0yLjYtNS42LTQuMS03LjYtNC4xICAgIGMtMi4zLDEuNC03LjcsNC42LTkuNCw2LjVjLTAuOSwxLDAuNCwxLjgsMC40LDEuOHMxLjItMC41LDEuNy0wLjZjMi41LTAuNyw4LTEuMiw5LjcsMS4zQzQyLDU0LjksNDIsNjMuNyw0Miw2NSAgICBDNDIsNjYuMiw0MS44LDcyLjIsNDEuOCw3Mi4yeiIgZmlsbD0iIzQ1MjIyOCIvPjxwYXRoIGQ9Ik0wLjUsNjVjMi45LDEsMy43LDcuMiwzLjcsNy4yUzQsNjYuMiw0LDY1YzAtMS42LDAuMi05LjEsMy40LTEyLjdjMy42LTQsOC40LTUuMywxMS4xLTMuNSAgICBjMS40LDAuOSw2LjEsNS41LDExLjEsMS43YzMtMi4zLDguNS03LjUsOC41LTcuNXMtMi45LTguOS0xNi4xLTcuOWMtNS42LDAuNS0xMS44LTAuOS0xMS44LTAuOXMtMC4xLDIuNSwwLjksMy44ICAgIEMyLjgsNDAuNCwwLjEsNDYuNC0wLjcsNTFjLTAuMiwwLjktMC4zLDEuOC0wLjMsMi43YzAsMC41LDAsMSwwLDEuNEMtMSw1OCwwLjEsNjMuMSwwLjUsNjV6IiBmaWxsPSIjNkIzNjNFIi8+PC9nPjwvc3ZnPg=='
            });
        }
    }

})();
