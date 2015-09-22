(function(angular) {
	var HATEOAS_URL = './api/tasks';
	var TaskFactory = function($http, SpringDataRestAdapter) {
		function Task(item) {

			if (item._resources) {
				item.resources = item._resources("self", {}, {
					update : {
						method : 'PUT'
					}
				});
				item.save = function(callback) {
					item.resources.update(item, function() {
						callback && callback(item);
					});
				};

				item.remove = function(callback) {
					item.resources.remove(function() {
						callback && callback(item);
					});
				};
			} else {
				item.save = function(callback) {
					console.log(item);
					// console.log(item.resources);
					Task.resources.save(item, function(task, headers) {
						var deferred = $http.get(headers().location);
						return SpringDataRestAdapter.process(deferred).then(
								function(newTask) {
									callback && callback(new Task(newTask));
								});
					});
				};
			}

			return item;
		}

		Task.query = function(callback) {
			var deferred = $http.get(HATEOAS_URL);

			return SpringDataRestAdapter.process(deferred).then(function(data) {
				Task.resources = data._resources("self");
				callback && callback(_.map(data._embeddedItems, function(task) {
					return new Task(task);
				}));
			});
		};

		Task.resources = null;

		return Task;
	};

	TaskFactory.$inject = [ '$http', 'SpringDataRestAdapter' ];
	angular.module("hrmApp.services").factory("TaskService", TaskFactory);
}(angular));