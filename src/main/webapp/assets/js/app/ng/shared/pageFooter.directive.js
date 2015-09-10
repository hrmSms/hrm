/**
 * Directive for page's footer
 */
'use strict';
angular.module('hrmApp.directives')
.directive('hrmPageFooter', function() {
  return {
    restrict : 'AECM',
    templateUrl : 'shared/page-footer.html',
    controller : 'PageFooterCtrl',
    link : function(scope, element, attributes) {
      // init theme (ace.min.js)
      //if (ace.init) ace.init.start();
    },
  };
});