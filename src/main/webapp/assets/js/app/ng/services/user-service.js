/**
 * 
 */
angular.module('hrmApp.services')
	.factory('UserService', ['$http', '$q', function($http, $q) {
		var user={};
		user.getAuthentication = function() {
			var deferred = $q.defer();
			$http.get('user').success(function(data) {
				console.log('data ' + JSON.stringify(data));
				deferred.resolve({
					authenticated : data.authenticated,
					username : data.principal.user.username,
					email : data.principal.user.email,
					nonExpired : data.principal.user.nonExpired,
					id : data.principal.user.id,
					role : data.principal.user.role,
					enabled : data.principal.user.enabled
				});
			}).error(function() {
				deferred.reject('There was an error');
			})
			return deferred.promise;
		}
		return user;
	}]);