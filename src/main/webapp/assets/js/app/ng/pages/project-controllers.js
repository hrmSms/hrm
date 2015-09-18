(function(angular) {
  var AppController = function($scope, Project) {
    Project.query(function(response) {
      $scope.projects = response ? response : [];
    });
    
    $scope.addProject = function(description) {
      new Project({
        description: description,
        name: description,
        ProjectOwner: 1,        
        ClientId: 1,
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