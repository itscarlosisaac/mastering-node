const io = require('socket.io').listen(8080);

io.sockets.on('connection', socket => {
  socket.emit('broadcast', { message: 'Hi!'});
  socket.on('clientmessage', data => {
    console.log(`Client said: ${data}`);
  });
});