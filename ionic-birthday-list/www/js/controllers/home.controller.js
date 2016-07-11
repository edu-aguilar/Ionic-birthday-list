(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController() {
        var vm = this;

        activate();

        function activate() {
            //scope methods
            vm.buttons = [{
                text: 'edit',
                class: 'button button-stable',
                onClick: onShareClick
            },
            {
                text: 'delete',
                class: 'button button-assertive',
                onClick: onDeleteClick
            }];

            var img = 'data:image/png;base64,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';

            vm.items = [{
                img: img,
                name: 'Silvia Marín Sánchez',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Eduardo Aguilar Tirado',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Manu Marín Sánchez',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Virginia Aguilar Tirado',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Eduardo Aguilar Tirado',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Manu Marín Sánchez',
                date: 'dd-mm-yyyy'
            },
            {
                img: img,
                name: 'Virginia Aguilar Tirado',
                date: 'dd-mm-yyyy'
            }];
        }

        function onShareClick(item, parentIndex, index) {
            console.log('Share clicked: ' + JSON.stringify(item) + " - parent index: " + parentIndex + " - button index: " + index);
        }

        function onDeleteClick(item, parentIndex, index) {
            console.log('delete clicked: ' + JSON.stringify(item) + " - parent index: " + parentIndex + " - button index: " + index);
            vm.items.splice(parentIndex, 1);
        }
    }
})();
