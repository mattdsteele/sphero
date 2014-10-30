var q = require('q');
var Cylon = require('cylon');

module.exports = (function() {
  var s;
  var ball;
  var connect = function() {
    var deferred = q.defer();
    Cylon.robot({
      connection: {
        name: 'sphero',
        adaptor: 'sphero',
        port: '/dev/tty.Sphero-BOR-AMP-SPP'
      },
      device: {
        name: 'sphero',
        driver: 'sphero'
      }
    })
    .on('ready', function(bot) {
      console.log('connected');
      ball = bot;
      deferred.resolve();
    })
    .start();
    return deferred.promise;
  };

  var setColor = function(rgb) {
    console.log('set color ', rgb);
    ball.sphero.setRGB(rgb);
  };

  var disconnect = function() {
    ball.sphero.stop();
  };
  return {
    connect: connect,
    setColor: setColor,
    disconnect: disconnect
  };
})();
