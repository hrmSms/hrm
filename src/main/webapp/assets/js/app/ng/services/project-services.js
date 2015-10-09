(function(angular) {
  var HATEOAS_URL = './api/projects';
  var ProjectFactory = function($http, SpringDataRestAdapter) {
    function Project(item) {
      console.log('Line 5: ' +item);
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
        	var urlBase = 'api';
        	$http.get(urlBase + '/projects/search/findByName?name='+item.name).
            success(function (data) {
                if (data._embedded != undefined) {
                    console.log(data._embedded.projects[0].name);
                    alert('Existed project '+item.name + '. Please enter other name!');
                } else {
                	Project.resources.save(item, function(project, headers) {
                        var deferred = $http.get(headers().location);
                        return SpringDataRestAdapter.process(deferred).then(function(newProject) {
                          callback && callback(new Project(newProject));
                        });
                      });
                }
                
            });
        };
      }

      return item;
    }
    
    Project.query = function(callback) {
      var deferred = $http.get(HATEOAS_URL);
      
      return SpringDataRestAdapter.process(deferred).then(function(data) {
    	Project.resources = data._resources("self");
        callback && callback(_.map(data._embeddedItems, function(project) {
          
          console.log('Line 46: ' +project);
          return new Project(project);
        }));
      });
    };
    
    Project.resources = null;
    
    return Project;
  };
  
  ProjectFactory.$inject = ['$http', 'SpringDataRestAdapter'];
  angular.module("hrmApp.services").factory("Project", ProjectFactory);
}(angular));