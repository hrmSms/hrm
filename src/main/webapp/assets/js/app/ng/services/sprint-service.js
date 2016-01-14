/**
 * Sprint service Author: nqhuy1@tma.com.vn
 */
angular.module("hrmApp.services").factory('sprintService',
    [ '$http', '$resource', '$q', '$log', 'ApiConfigs', function($http, $resource, $q, $log, ApiConfigs) {

      var Sprint = $resource(ApiConfigs.Url.SPRINT + '/:id?projection=sprintProjection', {
        id : '@id'
      }, {
        'getSprintsByProjectId': {method:'GET', url: ApiConfigs.Url.PROJECT + '/:id'},
        'get':    {method:'GET'},
        'create' : {method:'POST'},
        'update' : {method : 'PUT'}
      });

      return Sprint;
    } ]);