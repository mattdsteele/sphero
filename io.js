var io = require('socket.io')();
var sphero = require('./lib/sphero');

io.on('connection', function(socket) {
  console.log('we gots a connection');
  sphero.connect().then(function(ball) {
    console.log('yeah i am connected');
    socket.on('color', function(data) {
      ball.setRGB(toRgb(data));
    });
  });

  function toRgb(data) {
    return (data.r << 16) + (data.g << 8) + data.b;
  }

  socket.on('disconnect', function() {
    console.log('disconnecting!');
    sphero.disconnect();
  });
});
module.exports = io;
