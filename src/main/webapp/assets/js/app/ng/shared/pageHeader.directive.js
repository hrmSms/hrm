/**
 * Directive for page's footer
 */
'use strict';
angular.module('hrmApp.directives')
.directive('hrmPageHeader', function() {
  return {
    restrict : 'AECM',
    templateUrl : 'shared/page-header.html',
    controller : 'PageHeaderCtrl',
    link : function(scope, element, attributes) {
    },
  };
});