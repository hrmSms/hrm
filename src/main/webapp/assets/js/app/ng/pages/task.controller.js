// CRUD function
(function(angular) {
  var taskController = function($scope, Item) {
    Item.query(function(response) {
      $scope.items = response ? response : [];
    });
    
    $scope.addItem = function(description) {
      new Item({
        description: description,
        checked: false
      }).save(function(item) {
        $scope.items.push(item);
      });
      $scope.newItem = "";
      alert("hehe " + document.getElementById("id"));
    };
    
    $scope.updateItem = function(item) {
      item.save();
    };
    
    $scope.deleteItem = function(item) {
      item.remove(function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
      });
    };
  };
  

  angular.module("hrmApp.controllers").controller("taskController", ['$scope', 'Item', taskController]);
}(angular));