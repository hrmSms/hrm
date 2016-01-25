(function(angular) {
	//var AppController = function($scope, Project) {
	var AppController = function($scope, $state, $stateParams, Project) {
		
		if ($state.is('project.edit')) {
			var projectId = $stateParams.id;
			var action = $stateParams.action;
			console.log('project.edit state '+action);
			$scope.projects = {};
			$scope.action = action;
					Project.queryById(function(response) {
						$scope.projects = response ? response : [];				
//						console.log('Loading project ' + $scope.projects.name);							
						loadProject($scope.projects);
			});
			
		} 
		else 
		{
			$scope.projects = {};
			
			var action = $stateParams.action;
			$scope.action = action;
			
			Project.query(function(response) {
				$scope.projects = [];
				//filter active project
				for (var i = 0; i < response.length; i++) {
					var proj = response[i];
//					console.log('Loading project ' + proj.name +' is '+ proj.active);
					if (proj.active) {
						$scope.projects.push(proj);
					}
				}
		})};
		
		var loadProject = function(p) {
            $scope.p = p;
            $('#description').html(p.description);
            $scope.p.endDate = $scope.toVNDateFormat(p.endDate);	            
            $scope.p.startDate = $scope.toVNDateFormat(p.startDate);
            
          }
		
		// convert date to VietNam (UK) date format
        $scope.toVNDateFormat = function(date) {
          return moment(date).format("DD-MM-YYYY");
        }
		
		$scope.addProject = function(p) {
			
			var desc = $('#description').html();
			p.startDate = moment(p.startDate, "DD-MM-YYYY hh:mm:ss");
			p.endDate = moment(p.endDate, "DD-MM-YYYY hh:mm:ss");
			//console.log('Project client id' + p.clientId);
			if (p.clientId == null ) {
				p.clientId = 1;
			}
				
			p.clientId = new Number(p.clientId);
			
			new Project({
				description : desc,
				name : p.name,
				startDate : p.startDate,
				endDate : p.endDate,
				projectOwner : 1,
				clientId : p.clientId,
				active : 1
			}).save(function(project) {
				$scope.projects.push(project);
			});
			$scope.newProject = "";
		};

		$scope.updateProject = function(proj) {
			var projectId = proj.id;
			console.log('Update proj '+projectId);
			
			$state.go('project.edit', {
	              id : projectId,
	              action : 1
	            });
		};

		$scope.deleteProject = function(project) {
			console.log('Project id '+project.id);
			 project.active = 0;
			 if (project.clientId == null ) {
				 project.clientId = 1;
				}
			 
			 if (project.projectOwner == null ) {
				 project.projectOwner = 1;
				}
			project.save(function() {
				$scope.projects.splice($scope.projects.indexOf(project), 1);
			});
			$scope.goToProjectList();
		};
		
		var buildProject = function(project, id, p) {
			
			var desc = $('#description').html();
			p.startDate = moment(p.startDate, "DD-MM-YYYY hh:mm:ss");
			p.endDate = moment(p.endDate, "DD-MM-YYYY hh:mm:ss");
			//console.log('Project client id' + p.clientId);
			if (p.clientId == null ) {
				p.clientId = 1;
			}
				
			p.clientId = new Number(p.clientId);
			
			//console.log('Project id '+id);
			project = new Project({
				id: id,
				description : desc,
				name : p.name,
				startDate : p.startDate,
				endDate : p.endDate,
				projectOwner : 1,
				clientId : p.clientId,
				active : p.active
			})
			
			return project;
		}
		 // save and redirect to project list
        $scope.createAndClose = function() {
        	console.log('createAndClose '+ $scope.action);
        	
        	if ($scope.action == 0) {
        		$scope.addProject($scope.p);
        	}
        	else {        		
            	var project = buildProject(project, $stateParams.id, $scope.p);            	
            	project.save();        		
        	}
        	$scope.goToProjectList();
        };

		// redirect project List
		$scope.goToProjectList = function() {
			$state.go('project.list', {
			},  {reload: true});			
		};

		// reset form
		$scope.reset = function(form) {
			if (form) {
				form.$setUntouched();
				form.$setPristine();
			}
			$scope.p = {};
			// clear description and note div on UIs
			$('#description').html('');
		}
		
		$scope.showDialog = function(id) {
            $(id).bPopup({
              opacity : 0.6,
              autoClose : 2000,
              positionStyle : 'fixed',
              modalClose : true,
              modal : false,
              position : [ 0, 0 ]
            });
          }
	};
	
	angular.module("hrmApp.controllers")
		.controller("AppController",[ '$scope', '$state', '$stateParams', 'Project', AppController ])
		;
	
}(angular));
