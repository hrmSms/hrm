/* Controller of Sprint Author: nduyanh@tma.com.vn */

'use strict';
angular.module('hrmApp.controllers').controller(
		'TaskController',
		[
				'$scope',
				'$location',
				'$state',
				'$stateParams',
				'hrmService',
				function($scope, $location, $state, $stateParams, hrmService) {

					$scope.task = {};

					// clear description and note div on UIs
					$('#description').html(this.description);
					$('#note').html(this.note);

					var newTask = function() {
						this.name = 1;
						this.taskEst = $scope.sprint.actuals;
						this.toDo = document
								.getElementById('description').innerHTML;
						this.spentTime = moment($scope.sprint.endDate,
								"DD-MM-YYYY hh:mm:ss");
						this.startDate = $scope.sprint.name;
						this.endDate = document.getElementById('note').innerHTML;
						this.owner = $scope.sprint.planEstimate;
						this.description = $scope.sprint.planVelocity;
						this.note = $scope.project;
						this.userStoryId = $scope.sprint.id;
						// convert JSON to Object sprintstate
						this.taskStateId = JSON
								.parse($scope.sprint.sprintstate);
						
						
						
						
						this.startDate = moment($scope.sprint.startDate,
								"DD-MM-YYYY hh:mm:ss");
						this.taskEstimate = $scope.sprint.taskEstimate;
						this.toDo = $scope.sprint.toDo;
					}

					$scope.save = function() {
						hrmService.post("task/create", new newTask()).then(
								function(message) {
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

					// save and redirect to sprint list
					$scope.saveAndClose = function() {
						hrmService.post("./sprint/create", new newSprint())
								.then(function(message) {
									if (message.error) {
										$scope.success = null;
										$scope.error = message.error;
									}
									if (message.success) {
										$scope.error = null;
										$scope.success = message.success;
										// show message success dialog
										$scope.showDialog('#success');
										// redirect to sprint list page after 1 min
										setTimeout(function() {
											$scope.goToSprintList();
										}, 1000);
									}
								});
					};

					// redirect Sprint List
					$scope.goToTaskList = function() {
						$state.go('task.list', {
							usId : $scope.us.id
						});
					};

					// redirect Create Sprint Page
					$scope.goToCreateTask = function() {
						$state.go('task.create', {
							usId : $scope.us.id
						});
					};

					// redirect Edit Sprint Page
					$scope.goToEditTask = function(taskId) {
						$state.go('task.edit', {
							id : taskId,
						});
					};

					// reload state
					$scope.reload = function(stateName) {
						$state.reload(stateName);
					};

					// reset form
					$scope.reset = function(form) {
						if (form) {
							form.$setUntouched();
							form.$setPristine();
							// directive check float number
							form.$setValidity('float', true);
						}
						new initSprint();
					}

					// Get all SprintStates
					/*$scope.loadSprintStates = function() {
					  $scope.sprintStates = new Array();
					  hrmService.get("./sprintState/getall").then(function(items) {
					    $scope.sprintStates = items.sprintStates;
					  });
					};*/

					// get Sprint by id
					$scope.getByTaskID = function(taskId) {
						hrmService.get("./task/getByID/" + taskId, null).then(
								function(item) {
									$scope.task = item.sprint;
								});
					};

					// get project by id
					/*$scope.getByProjectID = function(projectId) {
					  hrmService.get("./project/getByID/" + projectId, null).then(function(item) {
					    $scope.project = item.project;
					  });
					};*/

					// get list sprints by project id
					$scope.getTasksByUSID = function(usId) {
						hrmService.get("./task/getByUserStoryID/" + usId, null)
								.then(function(item) {
									alert("Get data");
									$scope.tasks = item;
								});
					};

					// delete task by id
					$scope.onDelete = function(taskId) {
						hrmService.post("./task/delete/" + taskId, null).then(
								function(message) {
									$scope.message = message.message;
									$scope.loadsprints();
								});
					};

					// convert date to VietNam (UK) date format
					/*$scope.toVNDateFormat = function(date) {
					  return moment(date).format("DD/MM/YYYY");
					}*/

					// call when change page
					$scope.$on("$stateChangeSuccess", function() {
						// load list of sprints in a project
						if ($state.is('task.list')) {	
							alert("task.list!!!");
							$scope.getTasksByUSID($stateParams.usId);
							//$scope.getByProjectID($stateParams.projectId);
						}

						// load project and sprintstates for create sprint form
						/*if ($state.is('task.create')) {
							alert("task.create!!!");							
						}*/
						// load sprint, project and sprintstates for edit sprint form
						/*if ($state.is('task.edit')) {
							$scope.getBySprintID($stateParams.id);
							$scope.loadSprintStates();
							$scope.getByProjectID($stateParams.projectId);
						}*/
					});

					// load jquery table's script after generate all sprints' data
					$scope.$on('onRepeatLast', function(scope, element, attrs) {
						initTable();
					});

				} ]);

/*(function(angular) {
 var taskController = function($scope, $state, Task) {
 Task.query(function(response) {
 $scope.items = response ? response : [];
 console.log("$scope.items.length = " + $scope.items.length);
 for (i = 0; i < $scope.items.length; i++) {
 var item = $scope.items[i];
 console.log("item = " + JSON.parse(JSON.stringify(item)) );
 }
 });

 $scope.addItem = function(isNew, isClose, isReset) {
 if (isNew) { // new item
 new Task({
 name : $scope.ngName,
 state : $scope.ngState,
 status : $scope.ngStatus,
 taskEST : $scope.ngTaskEst,
 toDo : $scope.ngToDo,
 spentTime : $scope.ngTimeSpent,
 //owner : 1,
 userStoryId : 1,
 description :$('#desc').html(),
 note : $('#note').html(),
 assignee : $scope.ngAssignee
 }).save(function(item) {
 $scope.items.push(item);	
 if (!isClose) {
 alert("Save item successfully!");
 }					
 });
 $scope.newItem = "";
 } else {	// edit item

 } 	

 if (isReset) {
 console.log("before reset");
 $scope.ngName = "";
 $scope.ngState = "";
 $scope.ngTaskEst = "";
 $scope.ngToDo = "";
 $scope.ngTimeSpent = "";
 $('#desc').innerHTML = "";
 $('#note').innerHTML = "";
 console.log("after reset");
 }

 if (isClose) {
 $scope.redirect();
 }

 };

 $scope.updateItem = function(item) {
 item.save();
 };

 $scope.deleteItem = function(item) {
 item.remove(function() {
 $scope.items.splice($scope.items.indexOf(item), 1);
 //$state.go('task.list', {}, {reload: true}); 
 //$state.reload('task.list');
 $state.transitionTo($state.current, $stateParams, {
 reload: true,
 inherit: false,
 notify: true
 });
 });
 };

 $scope.redirect = function() {
 $state.go('task.list', {}, {reload: true}); 
 };
 };

 angular.module("hrmApp.controllers").controller("taskController",
 [ '$scope', '$state','TaskService', taskController ]);
 }(angular));*/