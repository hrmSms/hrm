/**
 * 
 */
angular.module("hrmApp.services")
	.factory("UserStory", ['$resource', function($resource) {
		var UserStory = $resource('./api/userStories/:id', {id : '@id'}, {
			update: {
				method: 'PUT', headers: {'Content-Type': 'application/json'}
			},
			pupdate: {
				method: 'PATCH', headers: {'Content-Type': 'application/json'}
			}
		});
		
		return UserStory;
	}])
	.factory("Task", ['$resource', function($resource) {
		var Task = $resource('./api/tasks/:id', {id : '@id'});
		return Task;
	}]);