var angular = require("angular");
var ionicModule = require('ionic-angular');
var ebmstats = require('ebmstats');
var svgTemplate = require("svgTemplate");
var utilities = require("utilities");

module.exports = angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller("DiagnosticTestCtrl", function($scope, $state, MyService, $ionicTabsDelegate, $window) {
  $scope.reset = function() {
    $scope.calculator.a = '';
    $scope.calculator.b = '';
    $scope.calculator.c = '';
    $scope.calculator.d = '';
    $scope.calculator.lrPlus = '';
    $scope.calculator.lrMinus = '';
  };

  $scope.$watchGroup([
    'calculator.a',
    'calculator.b',
    'calculator.c',
    'calculator.d'
  ], function() {
    $scope.calculator.lrPlus = '';
    $scope.calculator.lrMinus = '';
  });
  $scope.calculator = {};
  console.log("HERE");
  console.log(MyService.data);

  $scope.lrPlus = "adsa";
  $scope.lrMinus = "asdasdsa";

  $scope.calculateValues = function() {
    console.log($scope.calculator);
    var testValues = {
      "testPositiveDisease":parseFloat($scope.calculator.a),
      "testPositiveNoDisease":parseFloat($scope.calculator.b),
      "testNegativeDisease":parseFloat($scope.calculator.c),
      "testNegativeNoDisease":parseFloat($scope.calculator.d),
      "lrPlus":parseFloat($scope.calculator.lrPlus),
      "lrMinus":parseFloat($scope.calculator.lrMinus)
    };

    var calculatedValues = ebmstats.getDiagnosticTest(testValues);

    console.log($scope.calculator.lrPlus);
    console.log($scope.calculator.lrMinus);

    if ($scope.calculator.lrPlus != undefined && $scope.calculator.lrPlus != "" && $scope.calculator.lrMinus != undefined && $scope.calculator.lrMinus != "") {
      calculatedValues = {};
      calculatedValues.lrPlus = $scope.calculator.lrPlus;
      calculatedValues.lrMinus = $scope.calculator.lrMinus;
    }
    else
    {
      calculatedValues = ebmstats.getDiagnosticTest(testValues);
    }

    console.log(calculatedValues);

    MyService.update(calculatedValues);
    $scope.red = utilities.getLine(MyService.data.lrMinus);
    $scope.blue = utilities.getLine(MyService.data.lrPlus);
    $scope.calculator.lrPlus = MyService.data.lrMinus;
    $scope.calculator.lrMinus = MyService.data.lrPlus;
    $scope.results = MyService.data;

    $state.go($state.current, {}, {reload: true, notify:true});

    console.log($scope.lrPlus);

    $ionicTabsDelegate.select(1);
  };
})

.controller("ProspectiveStudyCtrl", function($scope, $state, MyService, $ionicTabsDelegate, $window) {
  $scope.calculator = {};
  $scope.reset = function() {
    $scope.calculator.a = '';
    $scope.calculator.b = '';
    $scope.calculator.c = '';
    $scope.calculator.d = '';
  };
  $scope.calculateValues = function() {
    var testValues = {
      "treatedDisease":parseFloat($scope.calculator.a),
      "treatedNoDisease":parseFloat($scope.calculator.b),
      "notTreatedDisease":parseFloat($scope.calculator.c),
      "notTreatedNoDisease":parseFloat($scope.calculator.d)
    };

    var calculatedValues = ebmstats.getProspectiveStudy(testValues);
    console.log(calculatedValues);

    $scope.results = calculatedValues;

    $state.go($state.current, {}, {reload: true, notify:true});

    $ionicTabsDelegate.select(1);
  };
})

.controller("CaseControlStudyCtrl", function($scope, $state, MyService, $ionicTabsDelegate, $window) {
  $scope.calculator = {};
  $scope.reset = function() {
    $scope.calculator.a = '';
    $scope.calculator.b = '';
    $scope.calculator.c = '';
    $scope.calculator.d = '';
  };
  $scope.calculateValues = function() {
    var testValues = {
      "caseExposed":parseFloat($scope.calculator.a),
      "caseNotExposed":parseFloat($scope.calculator.b),
      "controlExposed":parseFloat($scope.calculator.c),
      "controlNotExposed":parseFloat($scope.calculator.d)
    };

    var calculatedValues = ebmstats.getCaseControlStudy(testValues);

    $scope.results = calculatedValues;

    $state.go($state.current, {}, {reload: true, notify:true});

    $ionicTabsDelegate.select(1);
  };
})

.controller("RandomizedControlTrialCtrl", function($scope, $state, MyService, $ionicTabsDelegate, $window) {
  $scope.calculator = {};

  $scope.reset = function() {
    $scope.calculator.a = '';
    $scope.calculator.b = '';
    $scope.calculator.c = '';
    $scope.calculator.d = '';
  };
  $scope.calculateValues = function() {
    var testValues = {
      "experimentalOutcome":parseFloat($scope.calculator.a),
      "experimentalNoOutcome":parseFloat($scope.calculator.b),
      "controlOutcome":parseFloat($scope.calculator.c),
      "controlNoOutcome":parseFloat($scope.calculator.d)
    };

    var calculatedValues = ebmstats.getRct(testValues);

    $scope.results = calculatedValues;

    $state.go($state.current, {}, {reload: true, notify:true});

    $ionicTabsDelegate.select(1);
  };
})

.controller("HomeCtrl", function($scope, $state) {
  $scope.openStats = function() {
    $state.go("app.statsCalculator");
  };

  $scope.openNnt = function() {
    $state.go("app.nntConverter");
  };

})

.controller("NNTConverterCtrl", function($scope, $state, MyService, $ionicTabsDelegate, $window) {
  $scope.calculator = {};

  $scope.reset = function() {
    $scope.calculator.a = '';
    $scope.calculator.b = '';
    $scope.calculator.nnt = '';
  };

  $scope.calculateValues = function() {
    var testValues = {
      "or":parseFloat($scope.calculator.a),
      "peer":parseFloat($scope.calculator.b)
    };

    var nnt;
    var or = $scope.calculator.a;
    var peer = $scope.calculator.b;

    if (or < 1) {
      nnt = (1 - (peer * (1-or))) / ((1-peer) * peer * (1-or));
      nnt = Math.round(nnt);
    }
    else
    {
      nnt = (1 + (peer * (or-1))) / ((1-peer) * peer * (or-1));
      nnt = Math.round(nnt);
    }

    $scope.calculator.nnt = nnt;
  };
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});

require('chartService');
