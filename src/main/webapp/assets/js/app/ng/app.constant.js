/**
 * Constants
 */
'use strict';
angular.module('hrmApp.constants', []).constant('Formats', {
  INPUT_SHORT_DATE : "d/m/yyyy", // http://eternicode.github.io/bootstrap-datepicker/
  INPUT_SHORT_TIME : "h:M a",
  INPUT_SHORT_DATETIME : "d/m/yyyy h:M a",
  OUTPUT_SHORT_DATE : "d/M/yyyy", // https://docs.angularjs.org/api/ng/filter/date
  OUTPUT_SHORT_TIME : "h:m a",
  OUTPUT_SHORT_DATETIME : "d/M/yyyy h:m a",
  PLAN_ESTIMATE : "",
});
