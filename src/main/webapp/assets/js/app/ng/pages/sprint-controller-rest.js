/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller('SprintListCtrl',
    [ '$scope', 'sprintService', function($scope, sprintService) {
      
      sprintService.query(function(response) {
        $scope.sprints = response ? response : [];
      })
      console.log($scope.sprints);
    } ]);