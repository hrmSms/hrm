/**
 * Controller of Sprint Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.controllers').controller('SprintCtrl', [ '$scope','sprintService', function($scope, sprint) {

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
  
  var item={};
  
  sprint.query(function(response) {
    $scope.items = response ? response : [];
  });
  
  $scope.addItem = function(description) {
    console.log($scope.description);
    new sprint({
      description: description,
      checked: false
    }).save(function(item) {
      console.log(item);
      $scope.items.push(item);
    });
    $scope.newItem = "";
  };
  
  $scope.updateItem = function(item) {
    item.save();
  };
  
  $scope.deleteItem = function(item) {
    item.remove(function() {
      $scope.items.splice($scope.items.indexOf(item), 1);
    });
  };

  
} ]);