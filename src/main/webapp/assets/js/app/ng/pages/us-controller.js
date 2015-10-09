// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService',
                              function($scope, $http, $state, $stateParams, hrmService) {
	 // Get all USStates
	$scope.loadUsRelatedData = function() {
	      $scope.usStates = new Array();
	      $http.get("./us/create/relateddata").success(function(data) {
	        $scope.usStates = data.usStates;
	        $scope.usStatus = data.usStatus;
	        $scope.sprints = data.sprints;
	        $scope.users = data.users;
	      });
	    };

	 // save and redirect to sprint list
        $scope.saveAndClose = function() {
        	var formData = {
    				"name" : $scope.name,
    				"userStoryState" : $scope.usstate,
    				"userStoryStatus" : $scope.usstatus,
    				"owner" : $scope.assignee,
    				"planEst" : $scope.planest,
    				"todoEst" : $scope.todo,
    				"actual" : $scope.actual,
    				"description" : $scope.description,
    				"sprint" : iteration,
    				"velocity" : velocity,
    				"businessValue" : businessval,
    				"point" : pointval,
    				"note" : note
    		};
          hrmService.post("./us/create", formData).then(function(message) {
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
        
   // get project by id
      $scope.getByProjectID = function(projectId) {
    	  console.log("go to get project");
        hrmService.get("./project/getByID/" + projectId).then(function(data) {
        	console.log("project: " + data);
          $scope.project = data.project;
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
    	$scope.loadUsRelatedData();
     	$scope.getByProjectID($stateParams.projectId);     
      }
      // load sprint, project and sprintstates for edit sprint form
      if ($state.is('us.edit')) {
        /*$scope.getBySprintID($stateParams.id);*/
      }
    });

}]);