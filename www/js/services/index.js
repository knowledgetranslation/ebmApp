var angular = require("angular");
var ionicModule = require('ionic-angular');
var ebmstats = require('ebmstats');
var svgTemplate = require("svgTemplate");

module.exports = angular.module('starter.services', [])

.factory('MyService', function() {
  return {
    data: {
      'red':'heyasdas',
      'blue':'ya'
    },
    update: function(calculatedValues) {
      // Improve this method as needed
      this.data = calculatedValues;
    }
  };
});