(function() {
    'use strict';

    angular
        .module('directives')
        .directive('backgroundImage', backgroundImage);

    /* @ngInject */
    function backgroundImage() {
        var directive = {
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attrs) {

            if (attrs.backgroundImage) {
                var background = "url('" + attrs.backgroundImage + "') no-repeat center center fixed";
                el.css('background', background);
                el.css('-webkit-background-size', 'cover');
                el.css('-moz-background-size', 'cover');
                el.css('background-size', 'cover');
            }

        }
    }

})();
