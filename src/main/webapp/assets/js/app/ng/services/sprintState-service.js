/**
 * 
 */
angular.module("hrmApp.services").factory('sprintStateService',
    [ '$http', '$resource', '$q', '$log', 'ApiConfigs', function($http, $resource, $q, $log, ApiConfigs) {

      var SprintState = $resource(ApiConfigs.Url.SPRINT_STATE + '/:id?projection=sprintStateProjection', {
        id : '@id'
      }, {
        'query': {method: 'get', isArray: false, cancellable: true},
        'get':    {method:'GET'},
        'create' : {method:'POST'},
        'update' : {method : 'PUT'}
      });

      return SprintState;
      
    } ])