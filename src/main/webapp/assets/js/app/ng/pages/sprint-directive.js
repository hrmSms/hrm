/**
 * Directive for sprint author: nqhuy1@tma.com.vn
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
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.lowerThan) || $attrs.showError) {
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
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.higherThan, "DD-MM-YYYY").format('YYYY-MM-DD');
        var result = moment(myDate).isAfter(dateToCheck);
        ngModel.$setValidity("higherThan", result);
      }
    });

    $attrs.$observe("higherThan", function() {
      if (checkIfOneNullOrEmpty(ngModel.$modelValue, $attrs.higherThan) || $attrs.showError) {
        ngModel.$setValidity("higherThan", true);
      } else {
        var myDate = moment(ngModel.$modelValue, "DD-MM-YYYY").format('YYYY-MM-DD');
        var dateToCheck = moment($attrs.higherThan, "DD-MM-YYYY").format('YYYY-MM-DD');
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
  return function($scope, $element, $attrs) {
    if ($scope.$last)
      setTimeout(function() {
        $scope.$emit('onRepeatLast', $element, $attrs);
      }, 1);
  };
})
/*
 * author:Guilherme Ferreira http://gsferreira.com/archive/2014/05/angularjs-smart-float-directive/
 */
.directive('smartFloat', [ function() {
  var FLOAT_REGEXP_1 = /^\d{1}(\.\d{3})*(\,\d{0,4})$/; // Numbers like: 1.123,56
  var FLOAT_REGEXP_2 = /^\d{1}(\,\d{3})*(\.\d{0,4})$/; // Numbers like: 1,123.56
  var FLOAT_REGEXP_3 = /^\d{1,3}(\.\d{0,4})?$/; // Numbers like: 1123.56
  var FLOAT_REGEXP_4 = /^\d{1,3}(\,\d{0,4})?$/; // Numbers like: 1123,56

  var link = function($scope, $element, $attrs, ctrl) {
    var limit = parseInt($attrs.smartFloat);
    $scope.$watch(function() {
      return ctrl.$modelValue;
    }, function(newVal, oldVal) {
      angular.element($element).on("keyup", function() {
        if (this.value.length >= limit) {
          this.value = this.value.substring(0, limit);
        }
      });
    });

    var validator = function(viewValue) {
      var result;
      viewValue = viewValue.substring(0, limit);
      if (ctrl.$isEmpty(viewValue)) {
        ctrl.$setValidity('float', true);
        result = viewValue;
      } else if (FLOAT_REGEXP_1.test(viewValue)) {
        ctrl.$setValidity('float', true);
        result = viewValue.replace(/\./g, '').replace(',', '.');
      } else if (FLOAT_REGEXP_2.test(viewValue)) {
        ctrl.$setValidity('float', true);
        result = viewValue.replace(/\,/g, '');
      } else if (FLOAT_REGEXP_3.test(viewValue)) {
        ctrl.$setValidity('float', true);
        result = viewValue.substring(0, limit);
      } else if (FLOAT_REGEXP_4.test(viewValue)) {
        ctrl.$setValidity('float', true);
        result = viewValue.replace(',', '.');
      } else {
        ctrl.$setValidity('float', false);
        result = viewValue.replace(',', '.');
      }
      return parseFloat(result);
    };
    ctrl.$parsers.unshift(validator); 
  }
  return {
    restrict : '',
    require : 'ngModel',
    link : link
  };
} ]);