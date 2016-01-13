/**
 * 
 */
'use strict';
angular.module('hrmApp.route', [])
.config(['$urlMatcherFactoryProvider', function($urlMatcherFactoryProvider){
  $urlMatcherFactoryProvider.strictMode(false);
}])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
  // Redirect to '/' in case of unmatched url
  $urlRouterProvider.otherwise('/not-found');
  
  // Setup the states
  $stateProvider
    .state('blank', {
      url: '/blank',
      templateUrl: 'pages/blank.html',
      controller: ''
    })
    .state('home', {
      url: '/',
      templateUrl: 'pages/dashboard.html',
      controller: 'DashboardPageCtrl'
    })
    .state('403', {
      url: '/forbidden',
      templateUrl: 'pages/403.html'
    })
    .state('404', {
      url: '/not-found',
      templateUrl: 'pages/404.html'
    })
    .state('500', {
      url: '/error',
      templateUrl: 'pages/500.html'
    });			
					
	// Routes for tasks
	$stateProvider.state('task', {
		abstract : true,
		// Note: abstract still needs a ui-view for its children
		// to populate
		template : '<ui-view/>'
	})
	.state('task.list', {
	    url: '^/task?usId',
	    templateUrl: 'pages/task-list.html',
	    controller: 'TaskController'
	})
	.state('task.edit', {
		url : '^/task/edit?id&usId',
		templateUrl : 'pages/task-edit.html',
		controller : 'TaskController'
	})
	.state('task.create', {
	    url: '^/task/create?usId',
	    templateUrl: 'pages/task-create.html',
	    controller: 'TaskController'
	});
  
//Routes for Project
  $stateProvider
    .state('project', {
      abstract: true,
      // Note: abstract still needs a ui-view for its children to populate
      template: '<ui-view/>'
    })
    .state('project.list', {
      url: '/project/list',
      templateUrl: 'pages/project-list.html',
      controller: 'AppController'
    })
    .state('project.create', {
      url: '/project/create',
      templateUrl: 'pages/project-create.html',
      controller: 'AppController'
    });
  
// Routes for User Story
  $stateProvider
  .state('us', {
    abstract: true,
    // Note: abstract still needs a ui-view for its children to populate
    template: '<ui-view/>'
  })
  .state('us.list', {
    url: '^/us/list?projectId',
    templateUrl: 'pages/us-list.html',
    controller: 'UserStoryCtrl'
  })
  .state('us.create', {
	url: '^/us/create?projectId&action',
    templateUrl: 'pages/us-create.html',
    controller: 'UserStoryCtrl'
  })
  .state('us.edit', {
    url: '^/us/edit?id&projectId&action',
    templateUrl: 'pages/us-create.html',
    controller: 'UserStoryCtrl'
  });
  
//Routes for Sprint
  $stateProvider
  .state('sprint', {
    abstract: true,
    // Note: abstract still needs a ui-view for its children to populate
    template: '<ui-view/>'
  })
  .state('sprint.list', {
    url: '^/sprint?projectId',
    templateUrl: 'pages/sprint-list.html',
    controller: 'SprintListCtrl'
  })
  .state('sprint.create', {
    url: '^/sprint/create?projectId',
    templateUrl: 'pages/sprint-create.html',
    controller: 'SprintCtrl'
  })
  .state('sprint.edit', {
    url: '^/sprint/edit?id&projectId',
    templateUrl: 'pages/sprint-edit.html',
    controller: 'SprintCtrl'
  });

  //https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
  $urlRouterProvider.rule(function ($injector, $location) {
    var path = $location.url();
    // check to see if the path already has a slash where it should be
    if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
        return;
    }
    if (path.indexOf('?') > -1) {
        return path.replace('?', '/?');
    }
    return path + '/';
  });
}]);
