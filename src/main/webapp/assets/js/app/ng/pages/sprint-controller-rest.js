/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller(
    'SprintListCtrl',
    [ '$scope', '$stateParams', 'sprintService', '$http', 'ApiConfigs', '$state',
        function($scope, $stateParams, sprintService, $http, ApiConfigs, $state) {
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
                $scope.noSprint = $scope.Message.WARNING.NO_SPRINT;
              }
            }, function(errorResponse) {
              // error
              bootbox.alert("Error: " + errorResponse);
            })
          };
          $scope.getSprintsByProjectId(projectId);
          // delete sprint by id
          $scope.onDelete = function(sprint) {
            var sprintName = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            bootbox.confirm($scope.Message.CONFIRM.DELETE(sprintName), function(result) {
              if (result) {
                $scope.unActive(sprint);
              }
            });
          };
          // Inactive sprint
          $scope.unActive = function(sprint) {
            var updateSprint = angular.copy(sprint);
            updateSprint.active = 0;
            updateSprint.project = updateSprint._embedded.project._links.self.href;
            updateSprint.sprintstate = updateSprint._embedded.sprintstate._links.self.href;
            sprintService.update(updateSprint).$promise.then(function() {
              // success
              var index = $scope.sprints.indexOf(sprint);
              $scope.sprints.splice(index, 1);
              var sprintName = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              bootbox.alert($scope.Message.SUCCESS.DELETE(sprintName));
            }, function(errorResponse) {
              // error
              console.log(errorResponse);
            });
          }
          // go to sprint edit
          $scope.goToEditSprint = function(sprintId) {
            $state.go('sprint.edit', {
              id : sprintId,
            });
          }
          // convert to VN Date format
          $scope.VNDateFormat = function(string) {
            return moment(string).format($scope.Formats.VN_DATE);
          }
        } ]).controller(
    'SprintCreateCtrl',
    [ '$scope', '$stateParams', 'sprintService', 'sprintStateService', '$http', 'ApiConfigs', '$state',
        function($scope, $stateParams, sprintService, sprintStateService, $http, ApiConfigs, $state) {
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
              $scope.noSprintState = $scope.Message.WARNING.NO_SPRINTSTATE;
            }
          }, function(errorResponse) {
            // error
          })
          $scope.createAndClose = function() {
            var sprint = angular.copy($scope.sprint);
            sprint.active = 1;
            sprint.project = $scope.project._links.self.href;
            sprint.endDate = moment(sprint.endDate, $scope.Formats.VN_DATE);
            sprint.startDate = moment(sprint.startDate, $scope.Formats.VN_DATE);
            sprint.description = $('#description').html();
            sprint.note = $('#note').html();
            sprintService.create(sprint).$promise.then(function(data) {
              // success
              var sprintName = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
              bootbox.alert($scope.Message.SUCCESS.CREATE(sprintName), function() {
                $scope.goToSprintList();
              });
            }, function(errorResponse) {
              // error
              bootbox.alert("Error: " + errorResponse);
            })
          };
          // redirect Sprint List
          $scope.goToSprintList = function() {
            $state.go('sprint.list', {
              projectId : projectId
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
        } ]).controller(
    'SprintEditCtrl',
    [ '$scope', '$stateParams', 'sprintService', '$http', 'ApiConfigs', '$state', 'sprintStateService',
        function($scope, $stateParams, sprintService, $http, ApiConfigs, $state, sprintStateService) {
          $scope.sprint = {};
          //store old sprint
          var oldsprint = {};
          // get sprint id
          var sprintId = $stateParams.id;
          // get sprint by sprint id
          sprintService.getById({
            id : sprintId
          }).$promise.then(function(data) {
            // success
            if (data) {
              $scope.sprint = loadSprint(data);
              $scope.sprintstate = data._embedded.sprintstate;
              // set sprintstate link for sprint if not update !important
              $scope.sprint.sprintstate = $scope.sprintstate._links.self.href;
              $scope.project = data._embedded.project;
              // set project link for sprint if not update !important
              $scope.sprint.project = $scope.project._links.self.href;
              
            //store oldsprint
              oldsprint = angular.copy($scope.sprint);
            } else {
              // sprint doesn't exist 
              bootbox.alert($scope.Message.WARNING.NOT_EXIST_DATA, function(){
                $scope.goToSprintList();
              })
              
            }
          }, function(errorResponse) {
            // error
            bootbox.alert("Error: " + errorResponse);
          })
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
          var loadSprint = function(data) {
            var sprint = angular.copy(data);
            sprint.endDate = moment(sprint.endDate).format($scope.Formats.VN_DATE);
            sprint.startDate = moment(sprint.startDate).format($scope.Formats.VN_DATE);
            $('#description').html(sprint.description);
            $('#note').html(sprint.note);
            return sprint;
          }
          $scope.saveAndClose = function() {
            var sprint = angular.copy($scope.sprint);
            sprint.description = $('#description').html();
            sprint.note = $('#note').html();
            if (JSON.stringify(sprint) == JSON.stringify(oldsprint)) {
              //cancel update if no change
              console.log("No changes");
            } else {
              console.log(oldsprint);
              console.log(sprint);
              // update when at least one field change
              sprint.endDate = moment(sprint.endDate, $scope.Formats.VN_DATE);
              sprint.startDate = moment(sprint.startDate, $scope.Formats.VN_DATE);
              // update sprint
              sprintService.update(sprint).$promise.then(function(data) {
                // success
                var sprintName = sprint.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                bootbox.alert($scope.Message.SUCCESS.UPDATE(sprintName), function() {
                  $scope.goToSprintList();
                });
              }, function(errorResponse) {
                // error
                bootbox.alert("Error: " + errorResponse, function() {
                  $scope.goToSprintList();
                });
              })
            }
          };
          // redirect Sprint List
          $scope.goToSprintList = function() {
            $state.go('sprint.list', {
              projectId : $scope.project.id
            });
          };
        } ]);