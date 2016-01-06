'use strict';
(function(angular) {
    angular.module('hrmApp.controllers', []);
    angular.module('hrmApp.directives', []);
    angular.module('hrmApp.services', []);
    angular.module('hrmApp.constants', []);
    angular.module('hrmApp.modules', [ 'ngAnimate', 
                                       'ngCookies', 
                                       'ngResource',
                                       'ngMessages',
                                       'ui.router', 
                                       'spring-data-rest', 
                                       'oc.lazyLoad' ]);
    angular.module('hrmApp', [ 'hrmApp.modules', 
                               'hrmApp.constants', 
                               'hrmApp.route', 
                               'hrmApp.controllers', 
                               'hrmApp.directives', 
                               'hrmApp.services' ])
    .config(['$logProvider', function($logProvider) {
      $logProvider.debugEnabled(true);
    }])
    .run(['$log', '$rootScope', '$state', '$stateParams', '$cookieStore', function($log, $rootScope, $state, $stateParams, $cookieStore) {
      $rootScope.$state = $state;
      $rootScope.$state.params = $stateParams;
      $rootScope.$log = $log;
      // Keep last url for tracking 
      $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl, newState, oldState){
        $rootScope.previousUrl = oldUrl;
      });
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        $rootScope.$broadcast('pageContentLoading', {event: event});
      });
      $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function() {
          $rootScope.$broadcast('pageContentLoaded', {event: event});
        });
      });
      $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
        event.preventDefault();
        $state.go('home');
      });
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        event.preventDefault();
        $state.go('500');
      });
      // Fired once the view begins loading, before the DOM is rendered
      $rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
        // Access to all the view config properties.
        // and one special property 'targetView'
        // viewConfig.targetView 
      });
    }]);
}(angular));