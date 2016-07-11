angular.module('controllers', []);
angular.module('services', []);
angular.module('components', []);

angular.module('ionicBirthdayList', ['ionic', 'controllers', 'services', 'components', 'ngAnimate'])
        .run(runApp)
        .config(ionicConfig);

function runApp($ionicPlatform) {
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

function ionicConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MenuController as vm'
        })
        .state('app.home', {
            url: "/home",
            views: {
                'viewContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeController as vm'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/home');
}
