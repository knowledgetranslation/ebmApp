var angular = require("angular");
var ionicModule = require('ionic-angular');
var ebmstats = require('ebmstats');
var svgTemplate = require("svgTemplate");

module.exports = angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl"
      }
    }
  })

  .state('app.statsCalculator', {
    url: "/stats",
    views: {
      'menuContent': {
        templateUrl: "templates/statsCalculator.html"
      }
    }
  })

  .state('app.nntConverter', {
    url: "/nnt",
    views: {
      'menuContent': {
        templateUrl: "templates/nntConverter.html",
        controller: "NNTConverterCtrl"
      }
    }
  })

  .state('app.diagnostic', {
    url: "/stats/diagnosticTest",
    views: {
      'menuContent': {
        templateUrl: "templates/diagnosticTest.html",
        controller: "DiagnosticTestCtrl"
      }
    }
  })

  .state('app.prospective', {
    url: "/stats/prospectiveStudy",
    views: {
      'menuContent': {
        templateUrl: "templates/prospectiveStudy.html",
        controller: "ProspectiveStudyCtrl"
      }
    }
  })

  .state('app.caseControl', {
    url: "/stats/caseControlStudy",
    views: {
      'menuContent': {
        templateUrl: "templates/caseControlStudy.html",
        controller: "CaseControlStudyCtrl"
      }
    }
  })

  .state('app.randomized', {
    url: "/stats/randomizedControlTrial",
    views: {
      'menuContent': {
        templateUrl: "templates/randomizedControlTrial.html",
        controller: "RandomizedControlTrialCtrl"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});