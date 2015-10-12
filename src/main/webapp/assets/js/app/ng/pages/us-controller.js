// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService',
                              function($scope, $http, $state, $stateParams, hrmService) {
	 // Get all USStates
	$scope.loadUsRelatedData = function(projectId) {
	      $scope.usStates = new Array();
	      $http.get("./userstory/getrelateddata/" + projectId).success(function(data) {
	        $scope.usStates = data.usStates;
	        $scope.usStatus = data.usStatus;
	        $scope.sprints = data.sprints;
	        $scope.users = data.users;
	        $scope.project = data.project;
	      });
	    };

	 // save and redirect to sprint list
        $scope.saveAndClose = function() {
        	console.log($scope.usstate);
        	var formData = {
    				"name" : $scope.name,
    				"userStoryState" : JSON.parse($scope.usstate),
    				"userStoryStatus" : JSON.parse($scope.usstatus),
    				"owner" : JSON.parse($scope.assignee),
    				"planEst" : $scope.planest,
    				"todoEst" : $scope.todo,
    				"actual" : $scope.actual,
    				"description" :$('#description').html(),
    				"sprint" : JSON.parse($scope.iteration),
    				"velocity" : $scope.velocity,
    				"businessValue" : $scope.businessval,
    				"point" : $scope.pointval,
    				"note" : $('#note').html(),
    				"project" : $scope.project
    		};
        	console.log('formdata: ' + formData.owner);
          $http.post("./userstory/create", formData).then(function(message) {
            if (message.error) {
              $scope.success = null;
              $scope.error = message.error;
            }
            if (message.success) {
              $scope.error = null;
              $scope.success = message.success;
              // show message success dialog
              $scope.showDialog('#success');
              // redirect to sprint list page after 1 min
              setTimeout(function() {
                $scope.goToSprintList();
              }, 1000);
            }
          });
        };
        
        // Get all SprintStates
        $scope.loadUsStates = function() {
          hrmService.get("./userstory/getAllUsStates").then(function(data) {
            $scope.usStates = data.usStates;
          });
        };

        
    // call when change page
    $scope.$on("$stateChangeSuccess", function() {
      // load list of sprints in a project
      if ($state.is('us.list')) {
        /*$scope.getSprintsByProjectID($stateParams.projectId);
        $scope.getByProjectID($stateParams.projectId);*/
      }

      // load project and sprintstates for create sprint form
      if ($state.is('us.create')) {
    	  /*$scope.loadUsStates();*/
    	  $scope.loadUsRelatedData($stateParams.projectId);    
      }
      // load sprint, project and sprintstates for edit sprint form
      if ($state.is('us.edit')) {
        /*$scope.getBySprintID($stateParams.id);*/
      }
    });

}]);