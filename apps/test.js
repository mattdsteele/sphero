var sphero = require('../lib/sphero');
sphero.connect().then(function(ball) {
  console.log('connected!');
  ball.setRGB(toRgb({ r: 255, g: 0, b: 0}));
  ball.setRGB(toRgb({ r: 255, g: 0, b: 0}));
  ball.setRGB(toRgb({ r: 255, g: 0, b: 0}));
  ball.setRGB(toRgb({ r: 255, g: 0, b: 0}));
});

function toRgb(data) {
  var x = (data.r << 16) + (data.g << 8) + data.b;
  console.log(x);
  return 0xFF0000;
}
