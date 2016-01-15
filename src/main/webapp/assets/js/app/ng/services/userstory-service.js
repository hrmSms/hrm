/**
 * 
 */
angular.module("hrmApp.services")
	.factory("UserStory", ['$resource', function($resource) {
		var UserStory = $resource('./api/userStories/:id', {id : '@id'}, {
			update: {
				method: 'PUT'
			}
		});
		
		return UserStory;
	}])
	.factory("Task", ['$resource', function($resource) {
		var Task = $resource('./api/tasks/:id', {id : '@id'});
		return Task;
	}]);