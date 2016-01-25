/**
 * Controller of error page: 404 
 */
'use strict';
angular.module('hrmApp.controllers')
.controller('DashboardPageCtrl', ['$scope', '$http', '$state', 'UserService', function($scope, $http, $state, UserService) {
	
	 // call when change page
    $scope.$on("$stateChangeSuccess", function() {    	
    	UserService.getAuthentication()
    		.then(function(data) {
    			if (typeof(Storage) != "undefined") {
    				localStorage['authentication'] = JSON.stringify(data);
    				console.log('storage: ' + localStorage['authentication']);
    			}
    		}, function(data) {
    			alert('Not authenticated');
    		});
    });
	
}]);