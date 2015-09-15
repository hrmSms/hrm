'use strict';
(function(angular) {

	angular.module('hrmApp.controllers', []);
	angular.module('hrmApp.directives', []);
	angular.module('hrmApp.services', []);
	angular.module('hrmApp.modules', [ 'ngAnimate', 'ngCookies', 'ngResource',
			'ui.router', 'spring-data-rest' ]);
	angular.module('hrmApp', [ 'hrmApp.modules', 'hrmApp.route',
			'hrmApp.controllers', 'hrmApp.directives', 'hrmApp.services' ]);
}(angular));