var slib = require('../lib/sphero');

slib.connect().then(function(ball) {
  console.log('connected');
  ball.setRGB(0xbada55);
});
