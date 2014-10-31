var sphero = require('../lib/sphero');
var color = 0x00FF00,
  bitFilter = 0xFFFF00;

sphero.connect().then(function(ball) {
  ball.detectCollisions();
  ball.setRGB(color);
  ball.stop();

  ball.on('collision', function(data) {
    console.log("Collision:");
    color = color ^ bitFilter;
    console.log("Color: " + (color.toString(16)) + " ");
    ball.setRGB(color);
    ball.roll(90, Math.floor(Math.random() * 360));
  });
});
