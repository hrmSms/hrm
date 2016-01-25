/**
 * 
 */
angular.module('hrmApp.services')
	.factory('UserService', ['$http', '$q', function($http, $q) {
		var user={};

		user.getAuthentication = function() {
			var deferred = $q.defer();
			$http.get('user').success(function(data) {
				deferred.resolve(data);
			}).error(function() {
				deferred.reject('There was an error');
			})
			return deferred.promise;
		}
		return user;
	}]);