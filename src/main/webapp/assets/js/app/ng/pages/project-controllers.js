(function(angular) {
	//var AppController = function($scope, Project) {
	var AppController = function($scope, $state, $stateParams, Project) {
		$scope.projects = {};
		Project.query(function(response) {
			$scope.projects = response ? response : [];

			for (var i = 0; i < $scope.projects.length; i++) {
				var proj = $scope.projects[i];
				console.log('Loading project ' + proj.name);

			}
		});

		$scope.addProject = function(p) {
			
			
			 var desc = $('#description').html();
	            
			//p.startDate = d.toISOString();
			p.startDate = moment(p.startDate, "DD-MM-YYYY hh:mm:ss");
			p.endDate = moment(p.endDate, "DD-MM-YYYY hh:mm:ss");

			p.clientId = new Number(p.clientId);
			console.log('Project ' + p.clientId);
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
		

        // call when change page
//        $scope.$on("$stateChangeSuccess", function() {
//
//          // load list of sprints in a project
//          if ($state.is('project.list')) {
//        	  Project.query();
//          }
//          
//        });
		
		 // save and redirect to project list
        $scope.createAndClose = function() {
        	$scope.addProject($scope.p);
        	
                  // redirect to sprint list page after 1 min
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
		.directive(nameValidator, function($q, $timeout) {
			return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$asyncValidators.username = function(modelValue, viewValue) {
                        if (!viewValue) {
                            return $q.when(true);
                        }
                        var deferred = $q.defer();
                        $timeout(function() {
                            // Faking actual server-side validity check with $http.
                            // Let's pretend our service is so popular all short username are already taken
                            if (viewValue && viewValue.length < 5) {
                                deferred.reject();
                            }

                            deferred.resolve();
                        }, 2000);
                        return deferred.promise;
                    };
                }
            };
			
		}
		);
}(angular));