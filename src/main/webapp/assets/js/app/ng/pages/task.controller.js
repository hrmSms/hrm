// CRUD function
(function(angular) {
	var taskController = function($scope, $state, Task) {
		Task.query(function(response) {
			$scope.items = response ? response : [];
		});

		$scope.addItem = function(isNew, isClose, isReset) {
			if (isNew) { // new item
				new Task({
					name : $scope.ngName,
					state : $scope.ngState,
					status : $scope.ngStatus,
					taskEST : $scope.ngTaskEst,
					toDo : $scope.ngToDo,
					spentTime : $scope.ngTimeSpent,
					// description :$scope.ngDescription,
					// note : $scope.ngNote,
					assignee : $scope.ngAssignee
				}).save(function(item) {
					$scope.items.push(item);	
					if (!isClose) {
						alert("Save item successfully!");
					}					
				});
				$scope.newItem = "";
			} else {	// edit item
				
			} 	
			
			if (isReset) {
				$scope.ngName = "";
				$scope.ngState = "";
				$scope.ngStatus = "";
				$scope.ngTaskEst = "";
				$scope.ngToDo = "";
				$scope.ngTimeSpent = "";
				$scope.ngAssignee = "";
			}
			
			if (isClose) {
				$scope.redirect();
			}
			
		};

		$scope.updateItem = function(item) {
			item.save();
		};

		$scope.deleteItem = function(item) {
			item.remove(function() {
				$scope.items.splice($scope.items.indexOf(item), 1);
				$state.reload('task.list');
			});
		};
		
		$scope.redirect = function() {
			window.location = "#/task/list/";
		};
	};

	angular.module("hrmApp.controllers").controller("taskController",
			[ '$scope', '$state', 'TaskService', taskController ]);
}(angular));