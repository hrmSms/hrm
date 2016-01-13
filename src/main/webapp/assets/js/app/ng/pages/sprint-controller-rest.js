/**
 * Author: nqhuy1@tma.com.vn
 */
angular.module('hrmApp.controllers').controller('SprintListCtrl',
    [ '$scope', '$stateParams', 'sprintService',  function($scope, $stateParams, sprintService ) {
      //get list of sprints
      sprintService.getActiveSprintsByProjectId($stateParams.projectId).$promise.then(function(data){
        //get the project
        $scope.project = data;
        
        //get list of sprints
        $scope.sprints = [];
        if(data._embedded){
          angular.forEach(data._embedded.sprints,function(value,key){
            if(value.active===1){
              $scope.sprints.push(value);
            }
          })
        }else{
          //project doesn't have sprints
        }
        
      }, function(error){
        $scope.error = error;
      });
     
      } ]);