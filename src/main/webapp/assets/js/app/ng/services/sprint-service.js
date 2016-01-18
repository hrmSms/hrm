/**
 * Sprint service Author: nqhuy1@tma.com.vn
 */
angular.module("hrmApp.services").factory('sprintService',
    [ '$http', '$resource', '$q', '$log', 'ApiConfigs', function($http, $resource, $q, $log, ApiConfigs) {

      var Sprint = $resource(ApiConfigs.Url.SPRINT + '/:id?projection=sprintProjection', {
        id : '@id'
      }, {
        'getSprintsByProjectId': {method:'GET', url: ApiConfigs.Url.SPRINT + '/search/findByProjectIDAndActive?projectId=:projectId&active=:active&projection=sprintProjection'},
        'get':    {method:'GET'},
        'create' : {method:'POST'},
        'update' : {method : 'PUT'}
      });

      return Sprint;
      
    } ]).provider('dialog', [function(){
      var _message = "default_message";
      var _title = "default_title";
      var _locale="OK";
      var _escape = "true"; //onEscape
      var _s = true; //show
      var _b = true; //backdrop
      var _close = true; //closeButton
      var _a = true;//animation
      var _class = null;//className
      var _size= null; //size
      
      var _setOpts = function(opts){
        
      }
      /**
       * Use Backdrop
       *
       * Sets the use of the modal backdrop.  Either to have one or not and
       * whether or not it responds to mouse clicks ('static' sets the
       * backdrop to true and does not respond to mouse clicks).
       *
       * @param   val     mixed   (true, false, 'static')
       */
      this.useBackdrop = function(val){ // possible values : true, false, 'static'
          if(angular.isDefined(val))
              _b = val;
      }; // end useStaticBackdrop

      /**
       * Use ESC Close
       *
       * Sets the use of the ESC (escape) key to close modal windows.
       *
       * @param   val     boolean
       */
      this.useEscClose = function(val){ // possible values : true, false
          if(angular.isDefined(val))
              _k = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
      }; // end useESCClose

      /**
       * Use Class
       *
       * Sets the additional CSS window class of the modal window template.
       *
       * @param   val     string
       */
      this.useClass = function(val){
          if(angular.isDefined(val))
              _w = val;
      }; // end useClass

      /**
       * Use Copy
       *
       * Determines the use of angular.copy when sending data to the modal controller.
       *
       * @param   val     boolean
       */
      this.useCopy = function(val){
          if(angular.isDefined(val))
              _copy = (!angular.equals(val,0) && !angular.equals(val,'false') && !angular.equals(val,'no') && !angular.equals(val,null) && !angular.equals(val,false)) ? true : false;
      }; // end useCopy

      /**
       * Set Window Template
       *
       * Sets a path to a template to use overriding modal's window template.
       *
       * @param   val     string
       */
      this.setWindowTmpl = function(val){
          if(angular.isDefined(val))
              _wTmpl = val;
      }; // end setWindowTmpl

      /**
       * Set Size
       *
       * Sets the modal size to use (sm,lg,md)
       *
       * @param   val     string (sm,lg,md)
       */
      this.setSize = function(val){
          if(angular.isDefined(val))
              _wSize = (angular.equals(val,'sm') || angular.equals(val,'lg') || angular.equals(val,'md')) ? val : _wSize;
      }; // end setSize

      /**
       * Use Animations
       *
       * Sets the use of animations to true
       */
       this.useAnimation = function(){
          _animation = true;
       }; // end useAnimation
       this.$get = function(){
         return{
           
         }//end return
       }//end $get
    }]);