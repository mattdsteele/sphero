var io = require('socket.io')();
var sphero = require('./spheron/sphero-colors');

io.on('connection', function(socket) {
  console.log('we gots a connection');
  sphero.connect();

  function toRgb(data) {
    return data.r.toString(16) + data.g.toString(16) + data.b.toString(16);
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
