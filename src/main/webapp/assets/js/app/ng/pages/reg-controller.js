/**
 * 
 */
angular.module('myApp', ['validation.match'])
.controller('regController', ['$scope','$http', '$location', '$window', function($scope, $http, $location, $window) {
	$scope.submit = function() {
		var formData = {
				"email" : $scope.email,
				"username" : $scope.username,
				"password" : $scope.password,
		};
		var response = $http.post('register', formData);
		response.success(function(data, status, headers, config) {
			console.log(data);
			console.log(status);
			if(data.error) {
				console.log('go to error');
				$location.path='./register';
				$scope.password="";
				$scope.repeatpassword="";
				$scope.message=data.error;
				console.log('message: '+ $scope.message);
			}
			if(data.success) {
				//$location.path='/greeting';
				$window.location='./greeting';
			}
		});
	}
	
	$scope.validateEmail = function() {
		var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		console.log($scope.email);
		if($scope.email && EMAIL_REGEXP.test($scope.email)) {
			$scope.regForm.email.$setValidity("isValid", true);
			var userInput  = {
					"email": $scope.email
				};
			var response = $http.post('validate', userInput);
			response.success(function(data, status, headers, config) {
				console.log(data);
				var object = data;
				if(object.emailValidated == true) 
					$scope.regForm.email.$setValidity("isValidated", true);
				else
					$scope.regForm.email.$setValidity("isValidated", false);
			})
		}
		else if($scope.email){
			$scope.regForm.email.$setValidity("isValid", false);
		}
			
		
	}
	
	$scope.validateUsername = function() {
		var USERNAME_REGEXP = /^([a-zA-Z0-9]+)$/;
		
		if($scope.username && USERNAME_REGEXP.test($scope.username)) {
			$scope.regForm.username.$setValidity("isValid", true);
			var userInput  = {
					"username": $scope.username
				};
			var response = $http.post('validate', userInput);
			response.success(function(data, status, headers, config) {
				console.log(data);
				var object = data;				
				if(object.usernameValidated == true) 
					$scope.regForm.username.$setValidity("isValidated", true);
				else
					$scope.regForm.username.$setValidity("isValidated", false);
			})
		}
		else if ($scope.username) {
			$scope.regForm.username.$setValidity("isValid", false);
		}
			

	}
	
	$scope.clrEmMsg = function() {
		$scope.regForm.email.$setValidity("isValidated", true);
		$scope.regForm.email.$setValidity("isValid", true);
	}
	

	$scope.clrUsrMsg = function() {
		$scope.regForm.username.$setValidity("isValidated", true);
		$scope.regForm.username.$setValidity("isValid", true);
	}
}]);
/*.directive('validateEmail', function() {
	var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	return {
		require: 'ngModel',
		restrict: '',
		link: function(scope, elm, attrs, ctrl) {
			// only apply the validator if ngModel is present and Angular has added the email validator
			if (ctrl && ctrl.$validators.email) {

				// this will overwrite the default Angular email validator
				ctrl.$validators.email = function(modelValue) {
					console.log('is empty: ' + ctrl.$isEmpty(modelValue));
					console.log('regex test: ' + EMAIL_REGEXP.test(modelValue));
					return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
				};
			}
		}
	};
})
.directive('sameAs', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$parsers.unshift(validate);

                // Force-trigger the parsing pipeline.
                scope.$watch(attrs.sameAs, function() {
                    ngModel.$setViewValue(ngModel.$viewValue);
                });

                function validate(value) {
                    var isValid = scope.$eval(attrs.sameAs) == value;

                    ngModel.$setValidity('same-as', isValid);

                    return isValid ? value : undefined;
                }
            }
        };
    });*/
