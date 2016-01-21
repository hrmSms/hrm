/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller(
    'SprintListCtrl',
    [ '$scope', '$stateParams', 'sprintService', '$http', 'ApiConfigs',
        function($scope, $stateParams, sprintService, $http, ApiConfigs) {
          var projectId = $stateParams.projectId;
          // get project
          $http.get(ApiConfigs.Url.PROJECT + '/' + projectId + '?projection=projectProjection').then(function(data) {
            // success
            $scope.project = data.data;
          }, function(errorResponse) {
            // error
          });
          // get list of sprints
          $scope.getSprintsByProjectId = function(projectId) {
            sprintService.getSprintsByProjectId({
              projectId : projectId,
              active : 1
            }).$promise.then(function(data) {
              // success
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
          $scope.getSprintsByProjectId(projectId);
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
              var message = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              bootbox.alert(message + "deleted successfully");
            }, function(errorResponse) {
              // error
              console.log(errorResponse);
              bootbox.alert("Error: " + errorResponse);
            });
          }
          
        // convert to VN Date format
          $scope.VNDateFormat = function(string){
            return moment(string).format(Formats.VN_DATE);
          }
        } ]).controller(
    'SprintCreateCtrl',
    [ '$scope', '$stateParams', 'sprintService', 'sprintStateService', '$http', 'ApiConfigs', '$state','Message',
        function($scope, $stateParams, sprintService, sprintStateService, $http, ApiConfigs, $state, Message ) {
          $scope.sprint = {};
          // get project by id
          var projectId = $stateParams.projectId;
          // get project
          $http.get(ApiConfigs.Url.PROJECT + '/' + projectId + '?projection=projectProjection').then(function(data) {
            // success
            $scope.project = data.data;
          }, function(errorResponse) {
            // error
          });
          // get list of sprintStates
          sprintStateService.query(function(data) {
            // success
            if (data._embedded) {
              $scope.sprintStates = data._embedded.sprintStates;
            } else {
              // don't have any sprintState
            }
          }, function(errorResponse) {
            // error
          })
          $scope.createAndClose = function() {
            var sprint = angular.copy($scope.sprint);
            sprint.active = 1;
            sprint.project = $scope.project._links.self.href;
            sprint.endDate = moment(sprint.endDate, "MM-DD-YYYY");
            sprint.startDate = moment(sprint.startDate, "MM-DD-YYYY");
            console.log(sprint);
            sprintService.create(sprint).$promise.then(function(data){
              // success
              bootbox.alert(sprint.name+"success");
            }, function(errorResponse){
              // error
              console.log(errorResponse);
            })
          };
          
          // redirect Sprint List
          $scope.goToSprintList = function() {
            $state.go('sprint.list', {
              projectId : $scope.project.id
            });
          };
          
          // reset form
          $scope.reset = function(form) {
            if (form) {
              form.$setUntouched();
              form.$setPristine();
              // directive check float number
              form.planEstimate.$setValidity("float", true);
              form.taskEstimate.$setValidity("float", true);
              form.toDo.$setValidity("float", true);
              form.actual.$setValidity("float", true);
            }
            // clear sprint data
            $scope.sprint = {};
            // clear description and note div on UIs
            $('#description').html('');
            $('#note').html('');
          }
          
        } ]);