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
    .config(['$logProvider', '$httpProvider', function($logProvider, $httpProvider) {
      $logProvider.debugEnabled(true);
      $httpProvider.defaults.headers.patch = {
    		  'Content-Type': 'application/json;charset=utf-8'  
      }
    }])
    .run(['$log', '$rootScope', '$state', '$stateParams', '$cookieStore','Message', 'Formats', function($log, $rootScope, $state, $stateParams, $cookieStore, Message, Formats) {
      $rootScope.$state = $state;
      $rootScope.$state.params = $stateParams;
      $rootScope.$log = $log;
      //get message constant
      $rootScope.Message = Message;
      //get formats constant
      $rootScope.Formats = Formats;
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