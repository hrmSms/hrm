'use strict';
(function(angular) {

angular.module('hrmApp.controllers', []);
angular.module('hrmApp.services', []);
angular.module('hrmApp.modules', ['ngAnimate', 'ngCookies', 'ngResource', 'ui.router']);
angular.module('hrmApp', ['hrmApp.modules', 'hrmApp.route', 'hrmApp.controllers', 'hrmApp.services']);
}(angular));