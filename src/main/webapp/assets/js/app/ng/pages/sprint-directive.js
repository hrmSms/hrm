/**
 * Directive for sprint
 */
'use strict';
var checkIfOneNullOrEmpty = function(a, b) {
  if (a == null || a == '') {
    return true;
  }
  if (b == null || b == '') {
    return true;
  }
  return false;
}

angular.module('hrmApp.directives').directive('lowerThan', [ function() {

  var link = function($scope, $element, $attrs, ngModel) {
    $scope.$watch(function() {
      return ngModel.$modelValue;
    }, function() {
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.lowerThan)) {
        ngModel.$setValidity("lowerThan", true);
      } else {
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.lowerThan, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var result = moment(myDate).isBefore(dateToCheck);
        ngModel.$setValidity("lowerThan", result);
      }
    });

    $attrs.$observe("lowerThan", function() {
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.lowerThan)) {
        ngModel.$setValidity("lowerThan", true);
      } else {
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.lowerThan, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var result = moment(myDate).isBefore(dateToCheck);
        ngModel.$setValidity("lowerThan", result);
      }
    });
  };

  return {
    restrict : 'A',
    require : 'ngModel',
    link : link
  };

} ]).directive('higherThan', [ function() {

  var link = function($scope, $element, $attrs, ngModel) {
    $scope.$watch(function() {
      return ngModel.$modelValue;
    }, function() {
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.higherThan)) {
        ngModel.$setValidity("higherThan", true);
      } else {
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.higherThan, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var result = moment(myDate).isAfter(dateToCheck);
        ngModel.$setValidity("higherThan", result);
      }
    });

    $attrs.$observe("higherThan", function() {
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.higherThan)) {
        ngModel.$setValidity("higherThan", true);
      } else {
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.higherThan, "DD-MM-YYYY h:mm:ss").format('YYYY-MM-DD');
        var result = moment(myDate).isAfter(dateToCheck);
        ngModel.$setValidity("higherThan", result);
      }
    });
  };

  return {
    restrict : 'A',
    require : 'ngModel',
    link : link
  };

} ]).directive('onLastRepeat', function() {
  return function(scope, element, attrs) {
    if (scope.$last) setTimeout(function(){
        scope.$emit('onRepeatLast', element, attrs);
    }, 1);
};
});