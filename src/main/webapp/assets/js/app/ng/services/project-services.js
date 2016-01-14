(function(angular) {
  var HATEOAS_URL = './api/projects';
  var ProjectFactory = function($http, SpringDataRestAdapter, $stateParams) {
    function Project(item) {

      if (item._resources) {
    	  item.resources = item._resources("self", {}, {
          update: {
            method: 'PUT'
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
        	//console.log(item);
        	//console.log(item.resources);

        	Project.resources.save(item, function(project, headers) {
                var deferred = $http.get(headers().location);
                return SpringDataRestAdapter.process(deferred).then(function(newProject) {
                  callback && callback(new Project(newProject));
                });
              });
        };
      }

      return item;
    }
    
    Project.getById = function(projectId, callback) {

		var deferred = $http.get(HATEOAS_URL + '/' + projectId);

		return SpringDataRestAdapter.process(deferred).then(

		function(data) {

			callback && callback(new Project(data));

		});
	};
    
    Project.queryById = function(callback) {
	    
	    var projectId = $stateParams.id;
	    console.log('queryById ' +projectId);
		
	    var deferred = $http.get(HATEOAS_URL + '/' + projectId);

		return SpringDataRestAdapter.process(deferred).then(
			function(data) {
				callback && callback(new Project(data));
		});
    }
    
    Project.query = function(callback) {

      var deferred = $http.get(HATEOAS_URL);
      return SpringDataRestAdapter.process(deferred).then(function(data) {
//    	  console.log('Line 55 '+ data);
    	Project.resources = data._resources("self");
        callback && callback(_.map(data._embeddedItems, function(project) {
          
          
          return new Project(project);
        }));
      });
    };
    
    Project.resources = null;
    
    return Project;
  };
  
  ProjectFactory.$inject = ['$http', 'SpringDataRestAdapter', '$stateParams'];
  angular.module("hrmApp.services").factory("Project", ProjectFactory);
}(angular));
