// CRUD function
(function(angular) {
  var UserStoryCtrl = function($scope, Item) {
	  $scope.echo="Thong";
  };
  

  angular.module("hrmApp.controllers").controller("UserStoryCtrl", ['$scope', 'Item', UserStoryCtrl]);
}(angular));