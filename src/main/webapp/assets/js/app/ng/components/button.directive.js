/**
 * Button directive.
 */
'use strict';
angular.module('hrmApp.directives')
.directive('hrmButton', function() {
  return {
    restrict : 'AECM',
    templateUrl : 'components/button.html',
    scope: {
        type: '@',
        size: '@',
        label: '@',
        ngDisabled: '='
    },
    controller: ['$scope', function($scope) {
        if (!$scope.type) $scope.type = 'ok';
        $scope.isYes = ['yes', 'ok', 'create', 'save'].indexOf($scope.type) != -1;
        $scope.isNo = ['no', 'cancel', 'reset'].indexOf($scope.type) != -1;
        $scope.isClose = ($scope.type === 'close');
        $scope.isSmall = ($scope.size === 'sm');
        $scope.isMedium = !$scope.size ? true : ($scope.size === 'md');
        $scope.isLarge = ($scope.size === 'lg');
        if (!$scope.label) {
            $scope.label = $scope.type==='ok' ? 'OK' : $scope.type.toProperCase();
        }
    }],
    link : function(scope, element, attrs) {
        
    },
  };
});