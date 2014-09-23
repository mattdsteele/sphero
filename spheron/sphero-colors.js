var q = require('q');
var spheron = require('spheron');
var spheroPort = '/dev/rfcomm0';

module.exports = (function() {
  var s;
  var connect = function() {
    var deferred = q.defer();
    s = spheron.sphero().resetTimeout(true).requestAcknowledgement(true);
    s.open(spheroPort);
    s.on('open', deferred.resolve);

    return deferred.promise;
  };

  var setColor = function(rgbString) {
    var hex = parseInt(rgbString, 16);
    s.setRGB(hex, false);
  };

  var disconnect = function() {
    s.setRGB(0, false);
    s.close();
  };
  return {
    connect: connect,
    setColor: setColor,
    disconnect: disconnect
  };
})();
