/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller('SprintCtrl', [ '$scope', function($scope) {

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
  $scope.project = {};
  $scope.sprintstate = {};
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
  
  $scope.save= function(){
    console.log("save");
  }
} ]);