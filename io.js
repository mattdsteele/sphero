var io = require('socket.io')();
var sphero = require('./spheron/sphero-colors');

io.on('connection', function(socket) {
  console.log('we gots a connection');
  sphero.connect().then(function() {
    console.log('yeah i am connected');
  });

  function toRgb(data) {
    return parseInt((data.r.toString(16) + data.g.toString(16) + data.b.toString(16)), 16);
  }
  socket.on('color', function(data) {
    sphero.setColor(toRgb(data));
  });
  socket.on('disconnect', function() {
    console.log('disconnecting!');
    sphero.disconnect();
  });
});
module.exports = io;
