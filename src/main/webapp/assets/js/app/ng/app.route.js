/**
 * 
 */
'use strict';
angular.module('hrmApp.route', [])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
  // Redirect to '/' in case of unmatched url
  $urlRouterProvider.otherwise('/');
  
  // Setup the states
  $stateProvider
    .state('blank', {
      url: '/blank',
      templateUrl: 'pages/blank.html',
      controller: ''
    })
    
}]);
