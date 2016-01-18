/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller('SprintListCtrl',
    [ '$scope', '$stateParams', 'sprintService', function($scope, $stateParams, sprintService) {
      // get list of sprints
      $scope.getSprintsByProjectId = function(projectId) {
        sprintService.getSprintsByProjectId({
          projectId : projectId,
          active : 1
        }).$promise.then(function(data) {
          // success
          // get the project
          $scope.project = data;
          // get list of sprints
          $scope.sprints = [];
          if (data._embedded) {
            $scope.sprints = data._embedded.sprints;
          } else {
            // project doesn't have sprints
          }
        }, function(error) {
          // error
          $scope.error = error;
        })
      };
      $scope.getSprintsByProjectId($stateParams.projectId);
      // delete sprint by id
      $scope.onDelete = function(sprint) {
        var message = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        bootbox.confirm("Are you sure to delete " + message + " ?", function(result) {
          if (result) {
            $scope.unActive(sprint);
          }
        });
      };
      // Inactive sprint
      $scope.unActive = function(sprint) {
        console.log($scope.project);
        var updateSprint = angular.copy(sprint);
        updateSprint.active = 0;
        updateSprint.project = updateSprint._embedded.project._links.self.href;
        updateSprint.sprintstate = updateSprint._embedded.sprintstate._links.self.href;
        sprintService.update(updateSprint).$promise.then(function() {
          // success
          var index = $scope.sprints.indexOf(sprint);
          $scope.sprints.splice(index, 1);
          bootbox.alert(sprint.name + "deleted successfully");
        }, function(errorResponse) {
          // error
          console.log(errorResponse);
          bootbox.alert("Error: " + errorResponse);
        });
      }
    } ]).controller('SprintCreateController',
    [ '$scope', '$stateParams', 'sprintService', function($scope, $stateParams, sprintService) {
      
    } ]);