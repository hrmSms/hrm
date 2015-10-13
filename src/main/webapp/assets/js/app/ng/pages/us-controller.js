// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService',
                              function($scope, $http, $state, $stateParams, hrmService) {
	
		$scope.userstory = {};
		 // Get all USStates
		$scope.loadUsRelatedData = function(projectId) {
		      $http.get("./userstory/getrelateddata/" + projectId).success(function(data) {
		        $scope.usStates = data.usStates;
		        $scope.sprints = data.sprints;
		        $scope.users = data.users;
		        $scope.project = data.project;
		        $scope.parents = data.parents;
		      });
		    };
	    console.log('userstory object: ' + $scope.userstory.usStates);
	 // save and redirect to sprint list
        $scope.saveAndClose = function() {
        	var formData = {
        			"active" : 1,
    				"name" : $scope.userstory.name,
    				"userStoryState" : JSON.parse($scope.userstory.usstate),
    				"planEst" : $scope.userstory.planest,
    				"todoEst" : $scope.userstory.todo,
    				"actual" : $scope.userstory.actual,
    				"description" :$('#description').html(),
    				"businessValue" : $scope.userstory.businessval,
    				"point" : $scope.userstory.pointval,
    				"note" : $('#note').html(),
    				"project" : $scope.project
    		};
        	
        	if(typeof $scope.userstory.assignee !== "undefined" && $scope.userstory.assignee !== null)
        		formData["owner"] = JSON.parse($scope.userstory.assignee);
        	if(typeof $scope.userstory.iteration !== "undefined" && $scope.userstory.iteration !== null)
        		formData["sprint"] = JSON.parse($scope.userstory.iteration);
        	if(typeof $scope.userstory.parent != "undefined" && $scope.userstory.parent !== null)
        		formData["parent"] = JSON.parse($scope.userstory.parent);
        	if(typeof $scope.userstory.builddate !== "undefined" && $scope.userstory.builddate !== "")
        		formData["buildDate"] = moment($scope.userstory.builddate,"DD-MM-YYYY hh:mm:ss");
       	
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
            	  $scope.goToUsList();
              }, 1000);
            }
          });
        };
        
        //go to US list
        $scope.goToUsList = function() {
        	$state.go('us.list', {
                projectId : $scope.project.id
              });
        }
        
     // reset form
        $scope.reset = function(form) {
        	console.log('reset form');
          if (form) {
            form.$setUntouched();
            form.$setPristine();
            // directive check float number
            form.$setValidity('float', true);
          }
          $scope.userstory={};
          // clear description and note div on UIs
          $('#description').html('');
          $('#note').html('');

        }
  
     // get list sprints by project id
        $scope.getUserStoriesByProjectID = function(projectId) {
          hrmService.get("./userstory/getByProjectID/" + projectId).then(function(data) {
            $scope.userstories = data.userstories;
            $scope.project = data.project;
          });
        };
     
        // convert date to VietNam (UK) date format
        $scope.toVNDateFormat = function(date) {
        	console.log('date: ' + date);
        	if(typeof date !== undefined && date !== null)
        		return moment(date).format("DD-MM-YYYY");
        }
        
    // call when change page
    $scope.$on("$stateChangeSuccess", function() {
      // load list of sprints in a project
      if ($state.is('us.list')) {
        $scope.getUserStoriesByProjectID($stateParams.projectId);
        //$scope.getByProjectID($stateParams.projectId);
      }

      // load project and sprintstates for create sprint form
      if ($state.is('us.create')) {
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