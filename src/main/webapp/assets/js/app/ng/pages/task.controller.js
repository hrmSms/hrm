(function(angular) {
	var TaskController = function($scope, $state, $stateParams, hrmService) {
		//	Init params
		$scope.taskStates = null;
		$scope.users = null;
		$scope.tasks = null;
		$scope.userStory = null;
		$scope.project = null;
		
		// Get task by usId
		$scope.getTasksByUSID = function(usId) {
			hrmService.get("./task/getByUserStoryID/" + usId, null).then(function(item) {
				$scope.tasks = item;
			});
		};
		
		// Get UserStory by usId
		$scope.getUserStoryById = function(usId) {
			hrmService.get("./user_story/getByID/" + usId, null).then(function(item) {
				$scope.userStory = item;
			});
		};
		
		// get project by id
        $scope.getProjectById = function(projectId) {
        	hrmService.get("./project/getByID/" + projectId).then(function(item) {
        		$scope.project = item.project;
        	});
        };
		
		// Get all Users
		$scope.loadUser = function() {
			hrmService.get("./user/getall/").then(function(items) {
				$scope.users = items.users;
			});
		};
		
		// Get all TaskStates
        $scope.loadTaskStates = function() {
          hrmService.get("./taskState/getall").then(function(items) {
            $scope.taskStates = items.taskStates;
          });
        };
		
		$scope.$on("$stateChangeSuccess", function() {
			if ($state.is('task.list')) {	
				$scope.getTasksByUSID($stateParams.usId);
			}
			if ($state.is('task.create')) {	
				$scope.loadTaskStates();
				$scope.loadUser();
				$scope.getUserStoryById($stateParams.usId);
				$scope.getProjectById($stateParams.usId);
			}
		});
	};

	//TaskController.$inject = ['$scope', '$state', '$stateParams', 'hrmService', 'TaskService'];
	angular.module("hrmApp.controllers").controller("TaskController", ['$scope', '$state', '$stateParams', 'hrmService', TaskController]);
}(angular));