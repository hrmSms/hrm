// CRUD function
angular.module('hrmApp.controllers')
.controller('UserStoryCtrl', ['$scope', '$http', '$state', '$stateParams', 'hrmService', '$resource', 'SpringDataRestAdapter', 'UserStory', 
                              function($scope, $http, $state, $stateParams, hrmService, $resource, SpringDataRestAdapter, UserStory) {
	
	$scope.userstory = {};
		 // Get all related data
	var loadUsRelatedData = function(projectId) {
		
		$http.get('./api/userStoryStates', {
			params: {
				projection : 'userStoryProjection'	
			}
		}).success(function (response) {
			$scope.usStates = response._embedded.userStoryStates;
		});
		
		$http.get('./api/userStories/search/findByProjectId', {
			params: {
				projectId : projectId,
				projection : 'userStoryProjection'	
			}
		}).success(function (response) {
			$scope.parents = response._embedded.userStories;
		});
		
		$http.get('./api/sprints', {
			params: {
				projection : 'sprintProjection'	
			}
		}).success(function (response) {
			$scope.sprints = response._embedded.sprints;
		});
		
		$http.get('./api/users', {
			params: {
				projection : 'userProjection'	
			}
		}).success(function (response) {
			$scope.users = response._embedded.users;
		});
		
		$http.get('./api/projects/search/findById', {
			params: {
				projectId : projectId,
				projection : 'projectProjection'	
			}
		}).success(function (response) {
			$scope.project = response;
		});
    };

 // save and redirect to us list
    $scope.createAndClose = function() {
    	var newUserStory = new UserStory();
    	newUserStory = buildUserstoryObj(newUserStory, $scope);   	
    	newUserStory.$save(function() {
    		$scope.success = 'UserStory was created successfully';
    		$scope.showDialog('#success');
            // redirect to us list page after 1 sec
            setTimeout(function() {
            	$scope.goToUsList();
            }, 1000);
    	})
    };
        
    $scope.saveAndClose = function() {
    	var newUserStory = new UserStory();
    	newUserStory = buildUserstoryObj(newUserStory, $scope);   	
    	newUserStory.$update(function() {
    		$scope.success = 'UserStory was updated successfully';
       	 	$scope.showDialog('#success');
            // redirect to us list page after 1 min
            setTimeout(function() {
           	$scope.goToUsList();
            }, 1000);
    	});
      };
        
      $scope.onDelete = function(userstory) {
    	  var message = userstory.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          bootbox.confirm("Are you sure to delete " + message + " ?", function(result) {
            if (result) {
            	var deletedUserStory = new UserStory();
            	deletedUserStory.id = userstory.id;
            	deletedUserStory.$delete(function() {
            		 $scope.deleteSuccess = 'UserStory was deleted';
                     // show message success dialog
                     $scope.showDialog('#message');
                     // reload
                     console.log('delete on project: ' + $stateParams.projectId);
                     getUserStoriesByProjectID($stateParams.projectId);
            	});
            }
          });
      }
          
    var buildUserstoryObj = function(newUserStory, $scope) {
    	newUserStory.id = $scope.userstory.id;
    	newUserStory.active = 1;
    	newUserStory.name = $scope.userstory.name;
    	newUserStory.state = $scope.userstory.state._links.self.href;
    	newUserStory.planEst = $scope.userstory.planEst;
    	newUserStory.todoEst = $scope.userstory.todoEst;
    	newUserStory.actual = $scope.userstory.actual;
    	newUserStory.description = $('#description').html();
    	newUserStory.businessValue = $scope.userstory.businessValue;
    	newUserStory.point = $scope.userstory.point;
    	newUserStory.note = $('#note').html();
    	newUserStory.project = $scope.project._links.self.href;
    	if(typeof $scope.userstory.owner !== "undefined" && $scope.userstory.owner !== null)
    		newUserStory.owner = $scope.userstory.owner._links.self.href;
    	if(typeof $scope.userstory.sprint !== "undefined" && $scope.userstory.sprint !== null)
    		newUserStory.sprint = $scope.userstory.sprint._links.self.href;
    	if(typeof $scope.userstory.parent != "undefined" && $scope.userstory.parent !== null)
    		newUserStory.parent = $scope.userstory.parent._links.self.href;
    	if(typeof $scope.userstory.buildDate !== "undefined" && $scope.userstory.buildDate !== "")
    		newUserStory.buildDate = moment($scope.userstory.buildDate,"DD-MM-YYYY hh:mm:ss");
    	
    	return newUserStory;
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
          });
    }
    
    //pass userstory object value to us-edit page
    var loadUserStory  = function() {
    	$scope.userstory = JSON.parse(localStorage["userstory"]);
    	$scope.userstory.state =  $scope.userstory._embedded.state;
    	$scope.userstory.sprint = $scope.userstory._embedded.sprint;
    	$scope.userstory.owner = $scope.userstory._embedded.owner;
    	$scope.userstory.parent = $scope.userstory._embedded.parent;
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
    	var us = UserStory.get({projectId : projectId}, function() {
			$scope.userstories = us._embedded.userStories;
			$scope.project = $scope.userstories[0]._embedded.project;
			$scope.isAdmin = true;
		})
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