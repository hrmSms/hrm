/**
 * Sprint service Author: nqhuy1@tma.com.vn
 */
angular.module("hrmApp.services").factory('sprintService',
    [ '$http', '$resource', '$q', '$log', 'ApiConfigs', function($http, $resource, $q, $log, ApiConfigs) {
      var HATEOAS_URL = './api/sprints';
      var Sprint = $resource(ApiConfigs.Url.SPRINT + '/:id', {
        id : '@id', projection: sprintProjection
      }, {
        'get':    {method:'GET'},
        'create' : {method:'POST'},
        'update' : {method : 'PUT'}
      });
 
      Sprint.getActiveSprintsByProjectId = function(projectId) {
        var sprints = $resource(ApiConfigs.Url.PROJECT + '/:id', {
          id : '@id'
        });
        return sprints.get({id:projectId});
      };
      return Sprint;
    } ]);