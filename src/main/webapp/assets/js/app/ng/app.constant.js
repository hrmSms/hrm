/**
 * Constants
 */
'use strict';
angular.module('hrmApp.constants', []).constant('AppConfigs', {
  API_BASE_URI : "./api",
  SHORT_DATE_FORMAT : "dd/MM/yyyy",
  SHORT_DATETIME_FORMAT : "dd/MM/yyyy hh:mm:ss",
}).constant('Formats', {
  VN_DATE : "DD-MM-YYYY",
  MYSQL_DATE: "YYYY-MM-DD hh:mm:ss",
  INPUT_SHORT_DATE : "d/m/yyyy", // http://eternicode.github.io/bootstrap-datepicker/
  INPUT_SHORT_TIME : "h:M a",
  INPUT_SHORT_DATETIME : "d/m/yyyy h:M a",
  OUTPUT_SHORT_DATE : "d/M/yyyy", // https://docs.angularjs.org/api/ng/filter/date
  OUTPUT_SHORT_TIME : "h:m a",
  OUTPUT_SHORT_DATETIME : "d/M/yyyy h:m a",
  PLAN_ESTIMATE : "",
}).constant('Message', {
  ERROR : {
    FLOAT_FORMAT : "Please enter number betwwen 0 and 999",
    NAME_NULL : "Name is required",
    SPRINTSTATE_NULL : "Sprint State is required",
    STARTDATE_NULL : "Start Date is required",
    ENDDATE_NULL : "End Date is required",
    AFTER_ENDDATE : "Start Date should be less than End Date",
    BEFORE_STARTDATE : "End Date should be greater than Start Date",
    NAME_DUPLICATE : "Name is duplicated",
  },
  SUCCESS : {
    CREATE : function(name) {
      return name + " created successfully";
    },
    UPDATE : function(name) {
      return name + " updated successfully";
    },
    DELETE : function(name) {
      return name + " deleted successfully";
    }
  },
  WARNING : {
    NO_SPRINT: "No sprints found",
    NO_SPRINTSTATE: "No SprintState found",
    NOT_EXIST_DATA: "Data doesn't exist",
  },
  CONFIRM : {
    DELETE : function(name) {
      return "Are you sure to delete " + name + "?";
    },
  }
}).factory('ApiConfigs', [ 'AppConfigs', function(AppConfigs) {
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