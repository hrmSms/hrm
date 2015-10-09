/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller(
    'SprintCtrl',
    [ '$scope', '$location', '$state', '$stateParams', 'hrmService',
        function($scope, $location, $state, $stateParams, hrmService) {
          $scope.temp = {};
          $scope.sprint = {};

          var getSprint = function() {
            this.active = 1;
            this.actuals = $scope.sprint.actuals;
            this.description = $('#description').html();
            this.endDate = moment($scope.sprint.endDate, "DD-MM-YYYY hh:mm:ss");
            this.name = $scope.sprint.name;
            this.note = $('#note').html();
            this.planEstimate = $scope.sprint.planEstimate;
            this.planVelocity = $scope.sprint.planVelocity;
            this.project = $scope.project;
            this.id = $scope.sprint.id;
            // convert JSON to Object sprintstate
            this.sprintstate = JSON.parse($scope.sprint.sprintstate);
            this.startDate = moment($scope.sprint.startDate, "DD-MM-YYYY hh:mm:ss");
            this.taskEstimate = $scope.sprint.taskEstimate;
            this.toDo = $scope.sprint.toDo;
          }

          var loadSprint = function(sprint) {
            $scope.sprint = sprint;
            $('#description').html(sprint.description);
            $scope.sprint.endDate = $scope.toVNDateFormat(sprint.endDate);
            $('#note').html(sprint.note);
            $scope.sprint.startDate = $scope.toVNDateFormat(sprint.startDate);
            $scope.sprint.sprintstate = angular.toJson(sprint.sprintstate);
          }

          $scope.saveAndClose = function() {
            hrmService.post("./sprint/edit", new getSprint()).then(function(message) {
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

          // save and redirect to sprint list
          $scope.createAndClose = function() {
            hrmService.post("./sprint/create", new getSprint()).then(function(message) {
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

          // redirect Create Sprint Page
          $scope.goToCreateSprint = function() {
            $state.go('sprint.create', {
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
            $scope.sprint = {};
            // clear description and note div on UIs
            $('#description').html('');
            $('#note').html('');

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
              $scope.temp = item;
              loadSprint($scope.temp);
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
          $scope.onDelete = function(sprint) {
            var message = sprint.name.replace(/</g,'&lt;').replace(/>/g,'&gt;');
            bootbox.confirm("Are you sure to delete "+message+" ?", function(result) {
              if (result) {
                hrmService.post("./sprint/delete/" + sprint.id, null).then(function(message) {
                  $scope.deleteSuccess = message.success;
                  // show message success dialog
                  $scope.showDialog('#message');
                  // reload
                  $scope.getSprintsByProjectID(sprint.project.id);
                });
              }
            });
          };

          // convert date to VietNam (UK) date format
          $scope.toVNDateFormat = function(date) {
            return moment(date).format("DD-MM-YYYY");
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
              $scope.loadSprintStates();
              $scope.getByProjectID($stateParams.projectId);
            }
          });

          // load jquery table's script after generate all sprints' data
          $scope.$on('onRepeatLast', function(scope, element, attrs) {
            // initTable();
          });
          $scope.show = function() {
            bootbox.confirm("'<script>alert('hi,there!');</script>'", function(result) {
            }); 
          }
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