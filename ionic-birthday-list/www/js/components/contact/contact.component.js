(function() {
    'use strict';

    var contactList = {
        templateUrl: "js/components/contact/contact.html",
        bindings: {
            contacts: '<',
            swipable: '<',
            swipableOptions: '<'
        },
        controller: contactController
    };

    angular
        .module('components')
        .component('contactList', contactList);

    function contactController() {
        var vm = this;
    }

})();
