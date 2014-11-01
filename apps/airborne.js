var s = require('../lib/sphero');
var exec = require('child_process').exec;

var airborne = false;
s.connect().then(function(ball) {
  ball.setDataStreaming(['accelOne'], { n: 13, m: 1, pcnt: 0});
  ball.on('data', function(data) {
    var a = data[0];
    if (a < 50) {
      if (!airborne) {
        airborne = true;
        if (process.platform === 'darwin') {
          var cmd = 'say -v Victoria wheeeeeeee!';
          exec(cmd);
        }
      }
      ball.setRGB(0xFF0000);
    } else {
      if (airborne) {
        airborne = false;
      }
      ball.setRGB(0x00FF00);
    }
  });
});
