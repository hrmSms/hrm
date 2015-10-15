// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService',
                              function($scope, $http, $state, $stateParams, hrmService) {
	
		$scope.userstory = {};
		 // Get all USStates
		var loadUsRelatedData = function(projectId) {
		      $http.get("./user_story/get_related_data/" + projectId).success(function(data) {
		        $scope.usStates = data.usStates;
		        $scope.sprints = data.sprints;
		        $scope.users = data.users;
		        $scope.project = data.project;
		        $scope.parents = data.parents;
		      });
		    };

	 // save and redirect to sprint list
        $scope.createAndClose = function() {
        	hrmService.post("./user_story/create", new userstoryJsonObj()).then(function(message) {
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
              // redirect to us list page after 1 min
              setTimeout(function() {
            	  $scope.goToUsList();
              }, 1000);
            }
          });
        };
        
        $scope.saveAndClose = function() {
            hrmService.post("./user_story/edit", new userstoryJsonObj()).then(function(message) {
              if (message.error) {
                $scope.success = null;
                $scope.error = message.error;
              }
              if (message.success) {
            	  console.log('edit success: ' + message.success);
                $scope.error = null;
                $scope.success = message.success;
                // show message success dialog
                $scope.showDialog('#success');
                // redirect to us list page after 1 min
                setTimeout(function() {
              	  $scope.goToUsList();
                }, 1000);
              }
            });
          };
        
          $scope.onDelete = function(userstory) {
        	  var message = userstory.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              bootbox.confirm("Are you sure to delete " + message + " ?", function(result) {
                if (result) {
                  hrmService.post("./user_story/delete/" + userstory.id, null).then(function(message) {
                    $scope.deleteSuccess = message.success;
                    // show message success dialog
                    $scope.showDialog('#message');
                    // reload
                    console.log('delete on project: ' + $stateParams.projectId);
                    getUserStoriesByProjectID($stateParams.projectId);
                  });
                }
              });
          }
          
        var userstoryJsonObj = function() {
        	var formData = {
        			id : $scope.userstory.id,
        			active : 1,
    				name : $scope.userstory.name,
    				state : JSON.parse($scope.userstory.state),
    				planEst : $scope.userstory.planEst,
    				todoEst : $scope.userstory.todoEst,
    				actual : $scope.userstory.actual,
    				description :$('#description').html(),
    				businessValue : $scope.userstory.businessValue,
    				point : $scope.userstory.point,
    				note : $('#note').html(),
    				project : $scope.project
    		};
        	
        	if(typeof $scope.userstory.owner !== "undefined" && $scope.userstory.owner !== null)
        		formData["owner"] = JSON.parse($scope.userstory.owner);
        	if(typeof $scope.userstory.sprint !== "undefined" && $scope.userstory.sprint !== null)
        		formData["sprint"] = JSON.parse($scope.userstory.sprint);
        	if(typeof $scope.userstory.parent != "undefined" && $scope.userstory.parent !== null)
        		formData["parent"] = JSON.parse($scope.userstory.parent);
        	if(typeof $scope.userstory.buildDate !== "undefined" && $scope.userstory.buildDate !== "")
        		formData["buildDate"] = moment($scope.userstory.buildDate,"DD-MM-YYYY hh:mm:ss");
        	
        	return formData;
        }
        
          
        //go to US list page
        $scope.goToUsList = function() {
	    	$state.go('us.list', {
	            projectId : $scope.project.id
	          });
        }
        
      //go to US edit page
        $scope.goToEditUserStory = function(userstory) {
        	if (typeof(Storage) != "undefined") {
                localStorage["userstory"] = JSON.stringify(userstory);
            }
        	$state.go('us.edit', {
                projectId : $scope.project.id,
                id : userstory.id
              });
        }
        
        //pass userstory object value to us-edit page
        var loadUserStory  = function() {
        	$scope.userstory = JSON.parse(localStorage["userstory"]);
        	$scope.userstory.state = JSON.stringify($scope.userstory.state);
        	$scope.userstory.sprint = JSON.stringify($scope.userstory.sprint);
        	$scope.userstory.owner = JSON.stringify($scope.userstory.owner);
        	$scope.userstory.parent = JSON.stringify($scope.userstory.parent);
        	$scope.userstory.buildDate = $scope.toVNDateFormat($scope.userstory.buildDate);
        	 $('#description').html($scope.userstory.description);
        	 $('#note').html($scope.userstory.note);
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
  
     // get list userstories by project id
        var getUserStoriesByProjectID = function(projectId) {
          hrmService.get("./user_story/get_user_stories_by_project_id/" + projectId).then(function(data) {
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
        getUserStoriesByProjectID($stateParams.projectId);
        //$scope.getByProjectID($stateParams.projectId);
      }

      // load project and sprintstates for create sprint form
      if ($state.is('us.create')) {
    	  loadUsRelatedData($stateParams.projectId);    
      }
      // load sprint, project and sprintstates for edit sprint form
      if ($state.is('us.edit')) {
    	  loadUsRelatedData($stateParams.projectId);    
    	  loadUserStory();
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