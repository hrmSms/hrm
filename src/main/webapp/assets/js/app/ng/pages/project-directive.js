'use strict';
angular.module('hrmApp.directives').directive('projectnameValidator', function($q, $timeout, $http, ApiConfigs) {

  return {
    restrict : 'A',
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.projectname = function(modelValue, viewValue) {
            if (!viewValue) {
                return $q.when(true);
            }
            var deferred = $q.defer();
            
            var urlBase = ApiConfigs.Url.PROJECT;
        	urlBase += '/search/findByNameAndActive?name=';
        	urlBase += viewValue +'&active=1';
        	var isUnique = false;
        	$http.get(urlBase)
            .success(function (data) {
                if (data._embedded != undefined) {
//                	console.log('Line 19:' + data._embedded.projects[0].name);
                    isUnique = true;
                }        	                
            });
        	
        	
            $timeout(function() {
                if (viewValue && isUnique) {
                    deferred.reject();
                }

                deferred.resolve();
            }, 500);
            return deferred.promise;
        };
    }
  };

} )
