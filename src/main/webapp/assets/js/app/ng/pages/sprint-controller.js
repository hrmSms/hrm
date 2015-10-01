/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers')
    .controller(
        'SprintCtrl',
        [
            '$scope',
            '$location',
            '$state',
            '$stateParams',
            'sprintService',
            'sprintStateService',
            'projectService',
            'hrmService',
            function($scope, $location, $state, $stateParams, sprintService, sprintStateService, projectService,
                hrmService) {
              $scope.project = {};
              var initSprint = function() {
                $scope.id = null;
                $scope.active = 1;
                $scope.actuals = null;
                $('#description').html('');
                $scope.endDate = null;
                $scope.name = null;
                $('#note').html('');
                $scope.planEstimate = null;
                $scope.planVelocity = null;
                $scope.project = null;
                $scope.sprintstate = {};
                $scope.startDate = null;
                $scope.taskEstimate = null;
                $scope.toDo = null;
              }

              var sprint = function() {
                this.active = 1;
                this.actuals = $scope.actuals;
                this.description = document.getElementById('description').innerHTML;
                this.endDate = moment($scope.endDate, "DD-MM-YYYY hh:mm:ss");
                this.name = $scope.name;
                this.note = document.getElementById('note').innerHTML;
                this.planEstimate = $scope.planEstimate;
                this.planVelocity = $scope.planVelocity;
                this.project = $scope.project;
                this.id = $scope.id;
                // convert JSON to Object sprintstate
                this.sprintstate = JSON.parse($scope.sprintstate);
                this.startDate = moment($scope.startDate, "DD-MM-YYYY hh:mm:ss");
                this.taskEstimate = $scope.taskEstimate;
                this.toDo = $scope.toDo;
              }

              $scope.save = function() {
                var newSprint = new sprint();
                hrmService.post("sprint/create", newSprint).then(function(message) {
                  if (message.error) {
                    $scope.success = null;
                    $scope.error = message.error;
                  }
                  if (message.success) {
                    $scope.error = null;
                    $scope.success = message.success;
                    $scope.showDialog('#success');
                  }
                });
              };

              // save and redirect to sprint list
              $scope.saveAndClose = function() {
                var newSprint = new sprint();
                hrmService.post("./sprint/create", newSprint).then(function(message) {
                  if (message.error) {
                    $scope.success = null;
                    $scope.error = message.error;
                  }
                  if (message.success) {
                    $scope.error = null;
                    $scope.success = message.success;
                    // show message success dialog
                    $scope.showDialog('#success');
                    // redirect to sprint list page after 1 min
                    setTimeout(function() {
                      $scope.goToSprintList();
                    }, 1000);
                  }
                });
              };

              // redirect Sprint List
              $scope.goToSprintList = function() {
                $state.go('sprint.list', {
                  projectId : $scope.project.id
                });
              };

              // redirect Edit Sprint Page
              $scope.goToEditSprint = function(sprintId) {
                $state.go('sprint.edit', {
                  id : sprintId,
                  projectId : $scope.project.id
                });
              };

              // reload state
              $scope.reload = function(stateName) {
                $state.reload(stateName);
              };

              // reset form
              $scope.reset = function(form) {
                if (form) {
                  form.$setUntouched();
                  form.$setPristine();
                  // directive check float number
                  form.$setValidity('float', true);
                }
                new initSprint();
              }

              // Get all SprintStates
              $scope.loadSprintStates = function() {
                $scope.sprintStates = new Array();
                hrmService.get("./sprintState/getall").then(function(items) {
                  $scope.sprintStates = items.sprintStates;
                });
              };

              // get Sprint by id
              $scope.getBySprintID = function(sprintId) {
                hrmService.get("./sprint/getByID/" + sprintId, null).then(function(item) {
                  $scope.sprint = item.sprint;
                });
              };

              // get project by id
              $scope.getByProjectID = function(projectId) {
                hrmService.get("./project/getByID/" + projectId, null).then(function(item) {
                  $scope.project = item.project;
                });
              };

              // get list sprints by project id
              $scope.getSprintsByProjectID = function(projectId) {
                hrmService.get("./sprint/getByProjectID/" + projectId, null).then(function(item) {
                  $scope.sprints = item.sprints;
                });
              };

              // delete sprint by id
              $scope.onDelete = function(sprintId) {
                hrmService.post("./sprint/delete/" + sprintId, null).then(function(message) {
                  $scope.message = message.message;
                  $scope.loadsprints();
                });
              };

              // convert date to VietNam (UK) date format
              $scope.toVNDateFormat = function(date) {
                return moment(date).format("DD/MM/YYYY");
              }

              // call when change page
              $scope.$on("$stateChangeSuccess", function() {
                // load list of sprints in a project
                if ($state.is('sprint.list')) {
                  $scope.getSprintsByProjectID($stateParams.projectId);
                  $scope.getByProjectID($stateParams.projectId);
                }

                // load project and sprintstates for create sprint form
                if ($state.is('sprint.create')) {
                  $scope.loadSprintStates();
                  $scope.getByProjectID($stateParams.projectId);
                }
                // load sprint, project and sprintstates for edit sprint form
                if ($state.is('sprint.edit')) {
                  $scope.getBySprintID($stateParams.id);
                }
              });

              // load jquery table's script after generate all sprints' data
              $scope.$on('onRepeatLast', function(scope, element, attrs) {
                initTable();
              });

              $scope.showDialog = function(id) {
                $(id).bPopup({
                  opacity : 0.6,
                  autoClose : 2000,
                  positionStyle : 'fixed',
                  modalClose : true,
                  modal : false,
                  position : [ 0, 0 ]
                });
              }

            } ]);