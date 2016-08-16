(function() {
    'use strict';

    angular
        .module('services')
        .service('interceptorService', interceptorService);

    /* @ngInject */
    function interceptorService($q) {

      var _interceptor = {
          request: function(config) {
              console.log('requesting');
              return config || $q.when(config);
          },

          response: function(response) {
              console.log('response');
              console.log(response);
              if(response.status === 401) {
                  console.log('401');
              }
              return response || $q.when(response);
          },

          requestError: function(config) {
              console.log('request error');
              return $q.reject(config);
          },

          responseError: function(response) {
              console.log('response error');
              return $q.reject(response);
          }
        };

        return _interceptor;
    }
})();
