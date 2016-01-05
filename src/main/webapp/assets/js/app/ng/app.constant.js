/**
 * Constants
 */
'use strict';
angular.module('hrmApp.constants', []).constant('AppConfigs', {
  API_BASE_URI: "./api",
  SHORT_DATE_FORMAT: "dd/MM/yyyy",
  SHORT_DATETIME_FORMAT: "dd/MM/yyyy hh:mm:ss",
})
.constant('Formats', {
  INPUT_SHORT_DATE : "d/m/yyyy", // http://eternicode.github.io/bootstrap-datepicker/
  INPUT_SHORT_TIME : "h:M a",
  INPUT_SHORT_DATETIME : "d/m/yyyy h:M a",
  OUTPUT_SHORT_DATE : "d/M/yyyy", // https://docs.angularjs.org/api/ng/filter/date
  OUTPUT_SHORT_TIME : "h:m a",
  OUTPUT_SHORT_DATETIME : "d/M/yyyy h:m a",
  PLAN_ESTIMATE : "",
})
.factory('ApiConfigs', [ 'AppConfigs', function(AppConfigs) {
  var url_pattern = AppConfigs.API_BASE_URI + '/{0}';
  return {
    URL_PATTERN : url_pattern,
    Url : {
      PROJECT : url_pattern.format([ 'projects' ]),
      SPRINT : url_pattern.format([ 'sprints' ]),
      USER_STORY : url_pattern.format([ 'userStories' ]),
      TASK : url_pattern.format([ 'tasks' ]),
      SPRINT_STATE : url_pattern.format([ 'sprintStates' ]),
      USER_STORY_STATE : url_pattern.format([ 'userStoryStates' ]),
      TASK_STATE : url_pattern.format([ 'taskStates' ])
    },
    Projections : {
      list : 'list',
      detail : 'detail'
    }
  }
} ]);
