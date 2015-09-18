/**
 * Sprint service Author: nqhuy1@tma.com.vn
 */
angular.module("hrmApp.services").factory('sprintService',
    ['$http', 'SpringDataRestAdapter', function($http, SpringDataRestAdapter) {
      var HATEOAS_URL = './api/sprints';
      function Item(item) {

        if (item._resources) {
          item.resources = item._resources("self", {}, {
            update : {
              method : 'PUT'
            }
          });
          item.save = function(callback) {
            item.resources.update(item, function() {
              callback && callback(item);
            });
          };

          item.remove = function(callback) {
            item.resources.remove(function() {
              callback && callback(item);
            });
          };
        } else {
          item.save = function(callback) {
            Item.resources.save(item, function(item, headers) {
              var deferred = $http.get(headers().location);
              return SpringDataRestAdapter.process(deferred).then(function(newItem) {
                callback && callback(new Item(newItem));
              });
            });
          };
        }

        return item;
      }

      Item.query = function(callback) {
        var deferred = $http.get(HATEOAS_URL);
        // return SpringDataRestAdapter.processWithPromise(deferred).then(function(data) {
        return SpringDataRestAdapter.process(deferred).then(function(data) {
          Item.resources = data._resources("self");
          //console.log(data._resources("sprintstate"));
          callback && callback(_.map(data._embeddedItems, function(item) {
            //console.log(item);
            return new Item(item);
          }));
        });
      };

      Item.resources = null;

      return Item;
    } ]);