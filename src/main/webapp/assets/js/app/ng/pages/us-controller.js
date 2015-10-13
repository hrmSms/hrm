// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService',
                              function($scope, $http, $state, $stateParams, hrmService) {
	 // Get all USStates
	$scope.loadUsRelatedData = function(projectId) {
	      $scope.usStates = new Array();
	      $http.get("./userstory/getrelateddata/" + projectId).success(function(data) {
	        $scope.usStates = data.usStates;
	        $scope.sprints = data.sprints;
	        $scope.users = data.users;
	        $scope.project = data.project;
	        $scope.parents = data.parents;
	      });
	    };

	 // save and redirect to sprint list
        $scope.saveAndClose = function() {
        	var formData = {
        			"active" : 1,
    				"name" : $scope.name,
    				"userStoryState" : JSON.parse($scope.usstate),
    				"planEst" : $scope.planest,
    				"todoEst" : $scope.todo,
    				"actual" : $scope.actual,
    				"description" :$('#description').html(),
    				"businessValue" : $scope.businessval,
    				"point" : $scope.pointval,
    				"note" : $('#note').html(),
    				"project" : $scope.project
    		};
        	
        	if(typeof $scope.assignee !== "undefined" && $scope.assignee !== null)
        		formData["owner"] = JSON.parse($scope.assignee);
        	if(typeof $scope.iteration !== "undefined" && $scope.iteration !== null)
        		formData["sprint"] = JSON.parse($scope.iteration);
        	if(typeof $scope.parent != "undefined" && $scope.parent !== null)
        		formData["parent"] = JSON.parse($scope.parent);
        	if(typeof $scope.builddate !== "undefined" && $scope.builddate !== "")
        		formData["buildDate"] = moment($scope.builddate,"DD-MM-YYYY hh:mm:ss");
       	
        	console.log('formdata: ' + formData);
        	hrmService.post("./userstory/create", formData).then(function(message) {
        	  console.log('success message: ' + message.error);
        	  console.log('success message: ' + message.success);
            if (message.error) {
            	console.log('go to error');
              $scope.success = null;
              $scope.error = message.error;
            }
            if (message.success) {
            	console.log('success message: ' + message.success);
              $scope.error = null;
              $scope.success = message.success;
              // show message success dialog
              $scope.showDialog('#success');
              // redirect to sprint list page after 1 min
              setTimeout(function() {
            	  $state.go('sprint.list', {
                      projectId : $scope.project.id
                    });
              }, 1000);
            }
          });
        };
        
     
        // Get all UsStates
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
    
    $scope.showDialog = function(id) {
        $(id).bPopup({
          opacity : 0.6,
          autoClose : 2000,
          positionStyle : 'fixed',
          modalClose : true,
          modal : false,
          position : [ 0, 0 ]
        });
      }

}]);