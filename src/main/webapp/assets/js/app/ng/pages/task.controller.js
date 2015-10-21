(function(angular) {
	var TaskController = function($scope, $state, $stateParams, hrmService) {
		//	########################### Init params
		$scope.taskStates = null;
		$scope.users = null;
		$scope.tasks = null;
		$scope.userStory = null;
		$scope.userStoryId = null;
		$scope.project = null;
		$scope.success = null;
		$scope.error = null;
		$scope.editTask = null;
		$scope.task = {};
		
        //	########################### task.create functions
		$scope.getInfo = function() {        	
            hrmService.get("./taskState/getall").then(function(items) {	// Get all TaskStates
              $scope.taskStates = items.taskStates;
            });            
            
            hrmService.get("./user/getall/").then(function(items) {		// 	Get all Users
				$scope.users = items.users;
			});  
            
            hrmService.get("./user_story/getByID/" + $stateParams.usId).then(function(item) {	// Get UserStory by usId 
				$scope.userStory = item.userStory;
				$scope.project = item.userStory.project;
			});
        };
        
        var getTask = function() {
        	this.name = $scope.task.name;
        	this.taskEst = $scope.task.taskEst;
        	this.toDo = 0;
        	this.spentTime = 0;
        	if ($scope.task.owner != undefined) {
        		this.owner = JSON.parse($scope.task.owner);
        	} else {
        		this.owner = null;
        	}
        	
        	this.description = $('#desc').html();
        	this.note = $('#note').html();
        	this.userStoryId = {'id':$scope.userStory.id}; 
        	this.taskStateId = JSON.parse($scope.task.state);
        	
        	if ($stateParams.id != null) {
        		this.id = $stateParams.id;
        		this.toDo = $scope.task.toDo;
            	this.spentTime = $scope.task.spentTime;
        	}
        }        

        $scope.createAndClose = function() {
	        hrmService.post("./task/create", new getTask()).then(
			function(message) {
				if (message.error) {
					$scope.success = null;
					$scope.error = message.error;
				}
				if (message.success) {
					$scope.error = null;
					$scope.success = message.success;
					//$scope.showDialog('#success');
					setTimeout(function() {
						$scope.goToTaskList();
					}, 1000);
				}
			});
        };
        
     // reset form
        $scope.reset = function(form) {
          /*if (form) {
            form.$setUntouched();
            form.$setPristine();
            // directive check float number
            form.$setValidity('float', true);
          }*/
          $scope.task = {};
          // clear description and note div on UIs
          $('#desc').html('');
          $('#note').html('');

        }
        
        // ########################### task.list functions
        $scope.getTasksByUSID = function(usId) { 
        	hrmService.get("./task/getByUserStoryID/" + usId).then(function(item) {		// Get task by usId
				$scope.tasks = item;
				for (var i=0;i<$scope.tasks.length;i++) {
					$scope.tasks[i].description = $scope.tasks[i].description.replace(/<[^>]*>/g, ''); 
				}
        	});      
        	hrmService.get("./user_story/getByID/" + $stateParams.usId).then(function(item) {	// Get UserStory by usId 
				$scope.userStory = item.userStory;
			});
        }
        
        // delete sprint by id
        $scope.onDelete = function(task) {
        	hrmService.post("./task/delete/" + task.id, null).then(function(message) {
                $scope.deleteSuccess = message.success;
                $scope.getTasksByUSID(task.userStoryId.id);
        	});
        	
        	
        	
        	
        	/*var message = task.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          bootbox.confirm("Are you sure to delete " + message + " ?", function(result) {
        	  if (result) {
              hrmService.post("./task/delete/" + task.id, null).then(function(message) {
                $scope.deleteSuccess = message.success;
                $scope.getTasksByUSID(task.userStoryId.id);
              });
            }
          });*/
        };
        
        // 	########################### task.edit functions
        $scope.getTasksById = function(taskId) { 
        	hrmService.get("./task/getByID/" + taskId).then(function(item) {		
				$scope.editTask = item;
				loadTask($scope.editTask);
        	});        	
        }
        

	    $scope.saveAndClose = function() {
		hrmService.post("./task/edit", new getTask()).then(
			function(message) {
				if (message.error) {
					$scope.success = null;
					$scope.error = message.error;
				}
				if (message.success) {
					$scope.error = null;
					$scope.success = message.success;
					// show message success dialog
					//$scope.showDialog('#success');
					// redirect to sprint list page after 1 min
					setTimeout(function() {
						$scope.goToTaskList();
					}, 1000);
				}
			});
		};
        
        // ########################### Utilities
	    $scope.goToTaskList = function() {
			$state.go('task.list', {
				usId : $scope.userStory.id
			});
		};
		
		// redirect Edit Task Page
        $scope.goToEditTask = function(taskId) {
          $state.go('task.edit', {
            id : taskId,
            usId : $stateParams.usId
          });
        };
        
        /*angular.filter('htmlToPlaintext', function() {
            return function(text) {
              return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
            };
        });*/
        
        // Load edit Task
        var loadTask = function(task) {
        	$scope.task.name = task.name;
        	$scope.task.taskEst = task.taskEst;
        	$scope.task.toDo = task.toDo;
        	$scope.task.spentTime = task.spentTime;
        	$scope.task.owner = angular.toJson(task.owner);;
        	$('#desc').html(task.description);
        	$('#note').html(task.note);
        	$scope.task.state = angular.toJson(task.taskStateId);
          }
        
        // ########################### State cases
		$scope.$on("$stateChangeSuccess", function() {
			if ($state.is('task.list')) {	
				$scope.getTasksByUSID($stateParams.usId);
			}
			if ($state.is('task.create')) {	
				$scope.getInfo();
			}
			if ($state.is('task.edit')) {	
				$scope.getInfo();
				$scope.getTasksById($stateParams.id);
			}
		});
	};

	//TaskController.$inject = ['$scope', '$state', '$stateParams', 'hrmService', 'TaskService'];
	angular.module("hrmApp.controllers").controller("TaskController", ['$scope', '$state', '$stateParams', 'hrmService', TaskController]);
}(angular));