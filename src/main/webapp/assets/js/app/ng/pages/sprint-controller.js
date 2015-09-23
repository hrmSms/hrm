/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller(
    'SprintCtrl',
    [ '$scope', '$location', '$state', 'sprintService', 'sprintStateService', 'projectService', "hrmService",
        function($scope, $location, $state, sprintService, sprintStateService, projectService, hrmService) {

          var initSprint = function() {
            $scope.id = null;
            $scope.active = 1;
            $scope.actuals = null;
            //$scope.description = null;
            $scope.endDate = null;
            $scope.name = null;
            //$scope.note = null;
            $scope.planEstimate = null;
            $scope.planVelocity = null;
            $scope.projectID = null;
            $scope.sprintstate = {};
            $scope.startDate = null;
            $scope.taskEstimate = null;
            $scope.toDo = null;
          }

          var sprint = function() {
            console.log(document.getElementById('description').innerHTML);
            this.active = 1;
            this.actuals = $scope.actuals;
            this.description = document.getElementById('description').innerHTML;
            this.endDate = moment($scope.endDate, "DD-MM-YYYY h:mm:ss A");
            this.name = $scope.name;
            this.note = document.getElementById('note').innerHTML;
            this.planEstimate = $scope.planEstimate;
            this.planVelocity = $scope.planVelocity;
            this.projectID = $scope.projectID;
            this.id = $scope.id;
            // this.sprintstate = $scope.sprintstate;
            this.startDate = moment($scope.startDate, "DD-MM-YYYY h:mm:ss A");
            this.taskEstimate = $scope.taskEstimate;
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

          $scope.save = function() {
            var data = new Array();
            var newSprint = angular.toJson(new sprint());
            data.push(newSprint);
            data.push($scope.sprintstate);
            hrmService.post("sprint/create", data).then(function(message) {          
              if (message.error) {
                $scope.success=null;
                $scope.error = message.error;
              }
              if (message.success) {
                $scope.error = null;
                $scope.success = message.success;
              }
            });

          };
          
          $scope.saveAndClose = function(stateName) {
            $scope.save();
            if ($scope.success){
              $scope.close(stateName);
            }
          };
          
          $scope.saveAndNew = function(stateName) {
            $scope.save();
            if ($scope.success){
              new initSprint();
            }
          };
          
          $scope.goToState = function(stateName) {
            $state.go(stateName);
          };
          
          $scope.reload = function(stateName) {
            $state.reload(stateName);
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
          $scope.toVNDateFormat = function(date){
            return moment(date).format("DD/MM/YYYY");
          }
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
            if ($state.is('sprint.edit')) {
              $scope.loadSprintStates();
            }
          });
          $scope.$on('onRepeatLast', function(scope, element, attrs){
            console.log(" load table 2");
            initTable();
          });

        } ]);