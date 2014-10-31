var q = require('q');
var Cylon = require('cylon');

var defaultPort = '/dev/tty.Sphero-BOR-AMP-SPP';
var s;
var ball;
var connect = function(port) {
  var deferred = q.defer();
  Cylon.robot({
    connection: {
      name: 'sphero',
      adaptor: 'sphero',
      port: port || defaultPort
    },
    device: {
      name: 'sphero',
      driver: 'sphero'
    }
  })
  .on('ready', function(bot) {
    ball = bot;
    deferred.resolve(ball.sphero);
  })
  .start();
  return deferred.promise;
};

var setColor = function(rgb) {
  ball.sphero.setRGB(rgb);
};

var getSphero = function() {
  return ball.sphero;
};
var disconnect = function() {
  ball.sphero.stop();
};
var sphero = {
  connect: connect,
  getSphero: getSphero,
  disconnect: disconnect
};

module.exports = sphero;
