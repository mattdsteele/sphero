var sphero = require('./spheron/sphero-colors');
sphero.connect().then(function() {
  console.log('connected!');
  sphero.setColor(toRgb({ r: 255, g: 20, b: 147}));
});

function toRgb(data) {
  return (data.r << 16) + (data.g << 8) + data.b;
}
