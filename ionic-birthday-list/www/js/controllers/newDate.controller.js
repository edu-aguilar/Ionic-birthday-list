(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('NewDateController', NewDateController);

    /* @ngInject */
    function NewDateController(newDateService, $ionicActionSheet, $cordovaCamera) {
        var vm = this;

        activate();

        function activate() {
            vm.newDate = {};
            vm.relatedImage = null;

            vm.closeDateModal = closeDateModal;
            vm.addDate = addDate;
            vm.captureImage = captureImage;
        }

        //scope methods
        function closeDateModal() {
            var modal = newDateService.getModal().hide();
        }

        function addDate() {
            console.log(vm.newDate);
            closeDateModal();
            initModelVars();
        }

        function captureImage() {
            showActionSheet();
        }

        //private mthods
        function initModelVars() {
            vm.newDate = {};
            vm.wantAlertNotif = false;
            vm.timeAlertNotif = null;
            vm.relatedImage = null;
        }

        function showActionSheet() {
            var obj = {
                buttons: [
                   { text: 'Camera' },
                   { text: 'Gallery' }
                ],
                titleText: 'Select image',
                cancelText: 'Close',
                cancel: function() {
                    console.log('actionSheet closed');
                },
                buttonClicked: function(index) {
                    if (index === 0) {
                        takePicture(1);
                    } else {
                        takePicture(0);
                    }
                    return true;
                }
            };

            var backgroundImageActionSheet = $ionicActionSheet.show(obj);
        }

        function takePicture(sourceType) {
            var options = {
                quality: 80,
                destinationType: 0, //base64
                sourceType: sourceType, //0 galeria, 1 camara
                allowEdit: false,
                targetWidth: 800,
                saveToPhotoAlbum: false,
                correctOrientation: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
                vm.relatedImage = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                // error
            });

        }
    }
})();
