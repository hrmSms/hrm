/**
 * hrm-limit directive: Limit characters input. Author: nqhuy1@tma.com.vn
 */
'use strict';
angular.module('hrmApp.directives').directive('hrmLimit', [ function() {
  return {
    restrict : 'AECM',
    require : 'ngModel',
    link : function(scope, element, attrs, ctrl) {
      var limit = parseInt(attrs.hrmLimit);
      scope.$watch(function() {
        return ctrl.$modelValue;
      }, function(newVal, oldVal) {
        angular.element(element).on("keyup", function() {
          if (this.value.length >= limit) {
            this.value = this.value.substring(0, limit);
          }
        });
      });
    },
  };
} ]);