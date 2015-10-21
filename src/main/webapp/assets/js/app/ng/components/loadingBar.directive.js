/**
 * hrm-loading-bar directive. Show loading page while content is loading
 */
'use strict';
angular.module('hrmApp.directives').directive('hrmLoadingBar',
    [ '$rootScope', '$anchorScroll', '$timeout', function($rootScope, $anchorScroll, $timeout) {
      return {
        restrict : 'AC',
        template : '<span class="bar"></span>',
        link : function(scope, elm, attrs) {
          elm.addClass("hide");
          scope.$on("pageContentLoading", function() {
            $anchorScroll();
            elm.removeClass("hide").addClass("active");
          });
          scope.$on("pageContentLoaded", function() {
            $timeout(function() {
              elm.addClass("hide").removeClass("active");
            }, 1000);
          });
        },
      };
    } ]);