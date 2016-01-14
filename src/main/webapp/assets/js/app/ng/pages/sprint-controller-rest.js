/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller('SprintListCtrl',
    [ '$scope', '$stateParams', 'sprintService', function($scope, $stateParams, sprintService) {
      
      
      // get list of sprints
      $scope.getSprintsByProjectId = function(projectId) {
        sprintService.getActiveSprintsByProjectId(projectId).$promise.then(function(data) {
          //success
          
          // get the project
          $scope.project = data;
          // get list of sprints
          $scope.sprints = [];
          if (data._embedded) {
            angular.forEach(data._embedded.sprints, function(value, key) {
              if (value.active === 1) {
                $scope.sprints.push(value);
              }
            })
          } else {
            // project doesn't have sprints
          }
        }, function(error) {
          //error
          $scope.error = error;
        })
      };
      
      // Unactive sprint
      $scope.unActive = function(sprint) {
        sprintService.update({
          id : sprint.id
        }, sprint).$promise.then(function() {
          //success
          var index = $scope.students.indexOf(student);
          $scope.students.splice(index, 1);
        }, function(errorResponse){
          //error
          
        });
      }
    } ]);