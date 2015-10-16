(function(angular) {
  var AppController = function($scope, Project) {
	  Project.query(function(response) {
      $scope.projects = response ? response : [];
      var proj = $scope.projects[0];

      console.log('Tri 1  '+proj.description);      
    });
    
	$scope.addProject = function(p) {    	
      var d = new Date(p.startDate);
      var d2 = new Date(p.endDate);
      p.startDate = d.toISOString();
      p.endDate = d2.toISOString();
      p.clientId = Number(p.clientId);
      console.log('Project '+p);
      new Project({
        description: p.description,
        name: p.name,
        startDate: p.startDate,
        endDate: p.endDate,
        ProjectOwner: 1,        
        ClientId: p.clientId,
        Active: 1
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
  
  //AppController.$inject = ['$scope', 'Project'];
  angular.module("hrmApp.controllers").controller("AppController", ['$scope', 'Project', AppController]);
}(angular));