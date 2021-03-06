'use strict';

angular.module('fireflyApp')
   .directive('timeTimezone', ['$http', function($http) {
      return {
            restrict: 'E',
            template: '{{formatDate}}',
            scope: {
              date: "=",
              timezone: "="
            },
            link: function(scope, element, attrs) {

              var update = function upd() {
                if(scope.timezone && scope.date) {
                  scope.formatDate = moment(scope.date).tz(scope.timezone).format('llll');
                }
              };

              scope.$watch('date', function(oldVal, newVal) {
                update();
              });

              scope.$watch('timezone', function(oldVal, newVal) {
                update();
              });
            }
         };
   }])
   .directive('timeAgo', ['$timeout', function($timeout) {
      return {
            restrict: 'E',
            template: '{{formatDate}}',
            scope: {
              date: "="
            },
            link: function(scope, element, attrs) {
              var promise = null;

              var update = function() {
                if(scope.date) {
                  scope.formatDate = moment(scope.date).fromNow();
                  promise = $timeout(update, 60000, false);
                }
              };

              scope.$watch('date', function(oldVal, newVal) {
                if(promise) {
                  $timeout.cancel(promise);
                }
                update();
              });
            }
         };
   }])
   .directive('localTime', [function() {
      return {
            restrict: 'E',
            template: '{{formatDate}}',
            scope: {
              date: "="
            },
            link: function(scope, element, attrs) {
              var promise = promise;

              var update = function upd() {
                  scope.formatDate = moment(scope.date).format('llll');
              };

              scope.$watch('date', function(oldVal, newVal) {
                update();
              });
            }
         };
   }])
   .directive('time', [function() {
      return {
            restrict: 'E',
            template: '{{formatDate}}',
            scope: {
              date: "="
            },
            link: function(scope, element, attrs) {
              var promise = promise;

              var update = function upd() {
                  scope.formatDate = moment(scope.date).utc().format('llll');
              };

              scope.$watch('date', function(oldVal, newVal) {
                update();
              });
            }
         };
   }]);