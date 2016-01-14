/**
 * Sprint service Author: nqhuy1@tma.com.vn
 */
angular.module("hrmApp.services").factory('sprintService',
    [ '$http', '$resource', '$q', '$log', 'ApiConfigs', function($http, $resource, $q, $log, ApiConfigs) {
      var HATEOAS_URL = './api/sprints';
      var Sprint = $resource(ApiConfigs.Url.SPRINT + '/:id', {
        id : '@id'
      }, {
        'get':    {method:'GET'},
        'create' : {method:'POST'},
        'update' : {method : 'PUT'}
      });
      Sprint.url = function(link) {
        return link;
      }
      Sprint.getActiveSprintsByProjectId = function(projectId) {
        return $resource(ApiConfigs.Url.PROJECT + '/:id', {
          id : projectId
        });
      };
      return Sprint;
    } ]);