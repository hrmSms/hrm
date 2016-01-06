(function(angular) {
	//var AppController = function($scope, Project) {
	var AppController = function($scope, $state, $stateParams, Project) {
		$scope.projects = {};
		Project.query(function(response) {
			$scope.projects = response ? response : [];

			for (var i = 0; i < $scope.projects.length; i++) {
				var proj = $scope.projects[i];
//				console.log('Loading project ' + proj.name);

			}
		});

		$scope.addProject = function(p) {
			
			
			 var desc = $('#description').html();
	            
			//p.startDate = d.toISOString();
			p.startDate = moment(p.startDate, "DD-MM-YYYY hh:mm:ss");
			p.endDate = moment(p.endDate, "DD-MM-YYYY hh:mm:ss");
			console.log('Project client id' + p.clientId);
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

		$scope.updateProject = function(project) {
			project.save();
		};

		$scope.deleteProject = function(project) {
			project.remove(function() {
				$scope.projects.splice($scope.projects.indexOf(project), 1);
			});
		};
		


		
		 // save and redirect to project list
        $scope.createAndClose = function() {
        	$scope.addProject($scope.p);
        	$scope.goToProjectList();
//                 redirect to sprint list page after 1 min
//                  setTimeout(function() {
//                    $scope.goToProjectList();
 //                 }, 1000);
              
              

        };

		// redirect project List
		$scope.goToProjectList = function() {
			$state.go('project.list', {
			//projectId : $scope.project.id
			},  {reload: true});
			
			
			
//			$state.go($state.current, {}, {reload: true});
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
	
	// AppController.$inject = ['$scope', 'Project'];
	angular.module("hrmApp.controllers")
		.controller("AppController",[ '$scope', '$state', '$stateParams', 'Project', AppController ])
		//.service('projectService', ['$q', '$http', ProjectService])
		//.directive('uniqueProjectname', ['ProjectService', UniqueProjectnameDirective])
		
		.directive('projectnameValidator', function($q, $timeout, $http) {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$asyncValidators.projectname = function(modelValue, viewValue) {
                        if (!viewValue) {
                            return $q.when(true);
                        }
                        var deferred = $q.defer();
                        
                        var urlBase = 'api';
        	        	urlBase += '/projects/search/findByName?name=';        	        	
        	        	var isUnique = false;
        	        	$http.get(urlBase + viewValue)
        	            .success(function (data) {
        	                if (data._embedded != undefined) {
        	                	console.log('Line 165:' + data._embedded.projects[0].name);
        	                    isUnique = true;
        	                }        	                
        	            });
        	        	
        	        	
                        $timeout(function() {
                            if (viewValue && isUnique) {
                                deferred.reject();
                            }

                            deferred.resolve();
                        }, 500);
                        return deferred.promise;
                    };
                }
            };
		})
		;
	
}(angular));