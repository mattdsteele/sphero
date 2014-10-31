var s = require('../lib/sphero');
s.connect().then(function(ball) {
  ball.setDataStreaming(['accelOne'], { n: 13, m: 1, pcnt: 0});
  ball.on('data', function(data) {
    var a = data[0];
    if (a < 50) {
      ball.setRGB(0xFF0000);
    } else {
      ball.setRGB(0x00FF00);
    }
  });
});
