/**
 * hrm-ng-repeat-event directive.
 * Emit ngRepeatFinished event to parents.
 */
'use strict';
angular.module('hrmApp.directives')
.directive('hrmNgRepeatEvent', [ '$timeout', function($timeout) {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      if (scope.$last) {
        $timeout(function() {
          scope.$emit('ngRepeatFinished');
        });
      }
    },
  };
}]);