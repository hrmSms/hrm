/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller(
    'SprintCtrl',
    [ '$scope', 'sprintService', 'sprintStateService', 'projectService', "hrmService",
        function($scope, sprintService, sprintStateService, projectService, hrmService) {
          $scope.email = null;
          $scope.sprintID = null;
          $scope.active = 1;
          $scope.actuals = null;
          $scope.description = null;
          $scope.endDate = null;
          $scope.name = null;
          $scope.note = null;
          $scope.planEst = null;
          $scope.planVelocity = null;
          $scope.project = null;
          $scope.sprintstate = null;
          $scope.startDate = null;
          $scope.taskEst = null;
          $scope.toDo = null;

          $scope.sprint = function(id) {

            this.id = id;
            this.active = null;
            this.actuals = null;
            this.description = null;
            this.endDate = null;
            this.name = null;
            this.note = null;
            this.planEst = null;
            this.planVelocity = null;
            this.project = null;
            this.sprintstate = null;
            this.startDate = null;
            this.taskEst = null;
            this.toDo = null;
          };

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
          $scope.loadSprintStates = function() {
            $scope.sprintStates = new Array();
            console.log("load sprintstate");
            hrmService.get("sprintState/getall").then(function(items) {
              $scope.sprintStates = items.sprintStates;
            });
          };
          
          $scope.loadSprints = function() {
            $scope.sprints = new Array();
            console.log("load sprint");
            hrmService.get("sprint/getall").then(function(items) {
              console.log("huy");
              $scope.sprints = items.sprints;
            });
          };
          
          $scope.onDelete = function(sprintId) {
            hrmService.post("sprint/delete/" + sprintId, null).then(function(message) {
              $scope.message = message.message;
              $scope.loadsprints();
            });
          };
          
          $scope.$on("$stateChangeSuccess", function() {
            // hrmService.setScope($scope);
            $scope.loadSprints();
            $scope.loadSprintStates();
          });

        } ]);