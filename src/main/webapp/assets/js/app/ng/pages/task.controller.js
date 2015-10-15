(function(angular) {
	var TaskController = function($scope, $state, $stateParams, hrmService, TaskService) {
		//	Huy's code
		$scope.getTasksByUSID = function(usId) {
			hrmService.get("./task/getByUserStoryID/" + usId, null).then(function(item) {
				$scope.tasks = item;
			});
		};
		
		$scope.$on("$stateChangeSuccess", function() {
			if ($state.is('task.list')) {	
				$scope.getTasksByUSID($stateParams.usId);
			}
		});
		
		//	aTri's code
		$scope.addTask = function(task) {
			var d = new Date(p.startDate);
			var d2 = new Date(p.endDate);
			p.startDate = d.toISOString();
			p.endDate = d2.toISOString();
			p.clientId = Number(p.clientId);
			console.log('Project ' + p);
			new TaskService({
				description : p.description,
				name : p.name,
				startDate : p.startDate,
				endDate : p.endDate,
				ProjectOwner : 1,
				ClientId : p.clientId,
				Active : 1
			}).save(function(project) {
				$scope.projects.push(project);
			});
			$scope.newProject = "";
		};

		$scope.updateProject = function(project) {
			project.save();
		};

		$scope.deleteProject = function(project) {
			project.remove(function() {
				$scope.projects.splice($scope.projects.indexOf(project), 1);
			});
		};
	};

	//TaskController.$inject = ['$scope', '$state', '$stateParams', 'hrmService', 'TaskService'];
	angular.module("hrmApp.controllers").controller("TaskController", ['$scope', '$state', '$stateParams', 'hrmService', 'TaskService', TaskController]);
}(angular));