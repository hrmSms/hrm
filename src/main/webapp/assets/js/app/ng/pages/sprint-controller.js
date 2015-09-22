/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller(
    'SprintCtrl',
    [ '$scope', '$location', '$state', 'sprintService', 'sprintStateService', 'projectService', "hrmService",
        function($scope, $location, $state, sprintService, sprintStateService, projectService, hrmService) {
          var initSprint = function() {
            $scope.sprintID = null;
            $scope.active = 1;
            $scope.actuals = null;
            $scope.description = null;
            $scope.endDate = null;
            $scope.name = null;
            $scope.note = null;
            $scope.planEst = null;
            $scope.planVelocity = null;
            $scope.projectID = 1;
            $scope.sprintstate = {};
            $scope.startDate = null;
            $scope.taskEst = null;
            $scope.toDo = null;
          }

          var sprint = function() {
            this.active = 1;
            this.actuals = $scope.actuals;
            this.description = $scope.description;
            this.endDate = moment($scope.endDate, "DD-MM-YYYY h:mm:ss A");
            this.name = $scope.name;
            this.note = $scope.note;
            this.planEst = $scope.planEst;
            this.planVelocity = $scope.planVelocity;
            this.sprintID = 1;
            this.projectID = $scope.projectID;
            this.sprintstate = $scope.sprintstate;
            this.startDate = moment($scope.startDate, "DD-MM-YYYY h:mm:ss A");
            this.taskEst = $scope.taskEst;
            this.toDo = $scope.toDo;
          }
          /*
           * use HATEOSE spring data rest sprintService.query(function(response) { $scope.sprints = response ? response :
           * []; });
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
          var reload = function(state) {
            $state.reload(state);
          }
          $scope.save = function() {
            var newSprint = new sprint();
            newSprint = angular.toJson(newSprint);
            console.log(newSprint);
            hrmService.post("sprint/create", newSprint).then(function(message) {
              $scope.message = message.message;
              console.log(message);
            });

          };
          
          $scope.loadProjects = function() {
            $scope.projects = new Array();
            hrmService.get("project/getall").then(function(items) {
              $scope.projects = items.projects;
            });
          };
          
          $scope.loadSprintStates = function() {
            $scope.sprintStates = new Array();
            hrmService.get("sprintState/getall").then(function(items) {
              $scope.sprintStates = items.sprintStates;
            });
          };

          $scope.loadSprints = function() {
            $scope.sprints = new Array();
            hrmService.get("sprint/getall").then(function(items) {
              $scope.sprints = items.sprints;
            });
          };
          
          $scope.getByID = function(sprintId) {
            hrmService.post("sprint/getByID/" + sprintId, null).then(function(message) {
              $scope.message = message.message;
              $scope.loadsprints();
            });
          };

          $scope.onDelete = function(sprintId) {
            hrmService.post("sprint/delete/" + sprintId, null).then(function(message) {
              $scope.message = message.message;
              $scope.loadsprints();
            });
          };

          $scope.$on("$stateChangeSuccess", function() {
            // load list of sprint
            if ($state.is('sprint.list')) {
              $scope.loadSprints();
            }

            // load projects and sprintstates for create sprint form
            if ($state.is('sprint.create')) {
              $scope.loadSprintStates();
              $scope.loadProjects();
            }
            // load sprint, projects and sprintstates for edit sprint form
            if ($state.is('sprint.create')) {
              $scope.loadSprintStates();
            }

          });

        } ]);