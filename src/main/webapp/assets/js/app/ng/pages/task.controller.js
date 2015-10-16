(function(angular) {
	var TaskController = function($scope, $state, $stateParams, hrmService) {
		//	########################### Init params
		$scope.taskStates = null;
		$scope.users = null;
		$scope.tasks = null;
		$scope.userStory = null;
		$scope.project = null;
		$scope.success = null;
		$scope.error = null;
		
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
        	name = $scope.task.name;
        	taskEst = $scope.task.name;
        	toDo = $scope.task.toDo;
        	spentTime = $scope.task.spentTime;
        	/*startDate = task.
        	endDate = task.
        	this.startDate = moment($scope.sprint.startDate, "DD-MM-YYYY hh:mm:ss");*/
        	owner = JSON.parse($scope.task.owner);
        	description = $('#description').html();
        	note = $('#note').html();
        	userStoryId = $scope.userStory;
        	taskStateId = JSON.parse($scope.task.state);
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
					$scope.showDialog('#success');
					setTimeout(function() {
						$scope.goToTaskList();
					}, 1000);
				}
			});
        };
        
        // ########################### task.list functions
        $scope.getTasksByUSID = function(usId) { 
        	hrmService.get("./task/getByUserStoryID/" + usId).then(function(item) {		// Get task by usId
				$scope.tasks = item;
        	});        	
        }
        
        //	########################### Utilities
	    $scope.goToTaskList = function() {
			$state.go('task.list', {
				usId : $scope.userStory.id
			});
		};
		
        // ########################### State cases
		$scope.$on("$stateChangeSuccess", function() {
			if ($state.is('task.list')) {	
				$scope.getTasksByUSID($stateParams.usId);
			}
			if ($state.is('task.create')) {	
				$scope.getInfo();
			}
		});
	};

	//TaskController.$inject = ['$scope', '$state', '$stateParams', 'hrmService', 'TaskService'];
	angular.module("hrmApp.controllers").controller("TaskController", ['$scope', '$state', '$stateParams', 'hrmService', TaskController]);
}(angular));