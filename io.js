var io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('we gots a connection');
  socket.emit('news', {hello: 'world'});
  socket.on('color', function(data) {
    console.log(data);
  });
});
module.exports = io;
