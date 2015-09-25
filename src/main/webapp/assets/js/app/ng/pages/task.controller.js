// CRUD function
(function(angular) {
	var taskController = function($scope, $state, Task) {
		Task.query(function(response) {
			$scope.items = response ? response : [];
			console.log("$scope.items.length = " + $scope.items.length);
			for (i = 0; i < $scope.items.length; i++) {
				var item = $scope.items[i];
				console.log("item = " + JSON.parse(JSON.stringify(item)) );
			}
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
					//owner : 1,
					userStoryId : 1,
					description :$('#desc').html(),
					note : $('#note').html(),
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