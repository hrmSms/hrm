/**
 * hrm-datepicker directive.
 * http://bootstrap-datepicker.readthedocs.org/en/latest/index.html
 */
'use strict';
angular.module('hrmApp.directives')
.directive('hrmDatepicker', ['$ocLazyLoad', function($ocLazyLoad) {
  return {
    restrict : 'A',
    require: 'ngModel',
    link : function($scope, elm, attrs, ngModelCtrl) {
        $ocLazyLoad.load(['./assets/css/datepicker.min.css', 
                          './assets/js/date-time/bootstrap-datepicker.min.js']).then(function() {
            elm.datepicker({
                format: "dd/mm/yyyy",
                autoclose: true,
                todayHighlight: true
            });/*.on('changeDate', function(e) {
                $scope.$apply(function () {
                   ngModelCtrl.$setViewValue(e.date);
                });
            });*/
        });
    },
  };
}]);