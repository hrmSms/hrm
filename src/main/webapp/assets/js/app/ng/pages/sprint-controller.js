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
              /*
               * use HATEOSE spring data rest sprintService.query(function(response) { $scope.sprints = response ?
               * response : []; });
               * 
               * sprintStateService.query(function(response) { $scope.sprintStates = response ? response : []; });
               * 
               * projectService.query(function(response) { $scope.projects = response ? response : []; });
               * 
               * $scope.addItem = function(description) { new sprintService({ description : description, checked : false
               * }).save(function(item) { console.log(item); $scope.items.push(item); }); $scope.newItem = ""; };
               * 
               * $scope.updateItem = function(item) { item.save(); };
               * 
               * $scope.deleteItem = function(item) { item.remove(function() {
               * $scope.items.splice($scope.items.indexOf(item), 1); }); };
               */

              $scope.save = function() {
                var newSprint = angular.toJson(new sprint());
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

              $scope.saveAndClose = function(stateName) {
                var newSprint = angular.toJson(new sprint());
                hrmService.post("./sprint/create", newSprint).then(function(message) {
                  if (message.error) {
                    $scope.success = null;
                    $scope.error = message.error;
                  }
                  if (message.success) {
                    $scope.error = null;
                    $scope.success = message.success;
                    $scope.showDialog('#success');
                    setTimeout(function() {
                      $scope.goToState(stateName);
                    }, 1000);
                  }
                });
              };

              $scope.goToState = function(stateName) {
                $state.go(stateName);
              };

              $scope.reload = function(stateName) {
                $state.reload(stateName);
              };

              $scope.reset = function(form) {
                if (form) {
                  form.$setUntouched();
                  form.$setPristine();
                  // directive check float number
                  form.$setValidity('float', true);
                }
                new initSprint();
              }

              $scope.loadProjects = function() {
                $scope.projects = new Array();
                hrmService.get("./project/getall").then(function(items) {
                  $scope.projects = items.projects;
                });
              };

              $scope.loadSprintStates = function() {
                $scope.sprintStates = new Array();
                hrmService.get("./sprintState/getall").then(function(items) {
                  $scope.sprintStates = items.sprintStates;
                });
              };

              $scope.loadSprints = function() {
                $scope.sprints = new Array();
                hrmService.get("./sprint/getall").then(function(items) {
                  $scope.sprints = items.sprints;
                });
              };

              $scope.getBySprintID = function(sprintId) {
                hrmService.get("./sprint/getByID/" + sprintId, null).then(function(item) {
                  $scope.sprint = item.sprint;
                });
              };

              $scope.getByProjectID = function(projectId) {
                hrmService.get("./project/getByID/" + projectId, null).then(function(item) {
                  $scope.project = item.project;
                });
              };

              $scope.onDelete = function(sprintId) {
                hrmService.post("./sprint/delete/" + sprintId, null).then(function(message) {
                  $scope.message = message.message;
                  $scope.loadsprints();
                });
              };
              $scope.toVNDateFormat = function(date) {
                return moment(date).format("DD/MM/YYYY");
              }
              $scope.$on("$stateChangeSuccess", function() {
                // load list of sprint
                if ($state.is('sprint.list')) {
                  $scope.loadSprints();
                  $scope.getByProjectID($stateParams.id);
                }

                // load projects and sprintstates for create sprint form
                if ($state.is('sprint.create')) {
                  $scope.loadSprintStates();
                  if ($scope.project == null) {
                    console.log("project null ");
                  }
                  $scope.getByProjectID($stateParams.id);
                }
                // load sprint, projects and sprintstates for edit sprint form
                if ($state.is('sprint.edit')) {
                  $scope.getByID(1);
                }
              });
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

              /*
               * $scope.showDialog = function(id) { $(id).dialog({ show : "blind", hide: { effect: "explode", duration:
               * 1000 }, modal : true, dialogClass : "alert", open : function(event, ui) { setTimeout(function() {
               * $(id).dialog('close'); }, 2000); } }); }
               */
            } ]);