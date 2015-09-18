// CRUD function
(function(angular) {
	var taskController = function($scope, Task) {
		Task.query(function(response) {
			$scope.items = response ? response : [];
		});

		$scope.addItem = function(description) {
			new Task({
				description : description
			}).save(function(item) {
				$scope.items.push(item);
			});
			$scope.newItem = "";
		};

		$scope.updateItem = function(item) {
			item.save();
		};

		$scope.deleteItem = function(item) {
			item.remove(function() {
				$scope.items.splice($scope.items.indexOf(item), 1);
			});
		};
	};

	angular.module("hrmApp.controllers").controller("taskController",
			[ '$scope', 'Task', taskController ]);
}(angular));