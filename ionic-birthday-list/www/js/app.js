angular.module('controllers', []);
angular.module('services', []);
angular.module('components', []);
angular.module('directives', []);

angular.module('ionicBirthdayList', ['ionic', 'controllers', 'services', 'components', 'directives', 'ngAnimate', 'ngCordova', 'ngCordovaOauth'])
        .run(runApp)
        .config(ionicConfig);

function runApp($ionicPlatform, $http, $httpParamSerializerJQLike) {
    $http.defaults.transformRequest.unshift($httpParamSerializerJQLike);
    $ionicPlatform.ready(onPlatformReady);

    function onPlatformReady() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
    }
}

function ionicConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    /*TO AVOID CORS PROBLEMS - CHECK IT LATER*/
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MenuController as vm'
        })
        .state('app.login', {
            url: "/login",
            views: {
                'viewContent': {
                    templateUrl: "templates/login.html",
                    controller: 'LoginController as vm'
                }
            }
        })
        .state('app.home', {
            url: "/home",
            views: {
                'viewContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeController as vm'
                }
            }
        })
        .state('app.dateDetail', {
            url: "/dateDetail",
            params: {
              contact: null
            },
            views: {
                'viewContent': {
                    templateUrl: "templates/detailDate.html",
                    controller: 'DetailDateController as vm'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/login');
}
