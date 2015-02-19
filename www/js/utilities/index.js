var angular = require("angular");
var ionicModule = require('ionic-angular');
var ebmstats = require('ebmstats');

utilities = {
  "getLine": function(lr, canvas) {
    var canvas = canvas || {"width":297,"height":296};

    lr = parseFloat(lr);

    var line = "M0," + canvas.height; // move cursor to origin

    var points = ebmstats.getCoordinatesOfCurve(lr, canvas);

    points.forEach(function(point) {
      line += " L" + point.x + "," + point.y; // draw line to new x,y coordinate
    });

    return line;
  }
};

module.exports = utilities;