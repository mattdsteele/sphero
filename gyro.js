var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-BOR-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },
})
.on('ready', function(robot) {
  console.log('connected!!!!!');
  robot.sphero.setDataStreaming(['accelOne'], {
    n: 13,
    m: 1,
    pcnt: 0
  });
  robot.sphero.on('data', function(data) {
    var a = data[0];
    if (a < 50) {
      robot.sphero.setRGB(0xFF0000);
    } else {
      robot.sphero.setRGB(0x00FF00);
    }
  });
})
.start();
